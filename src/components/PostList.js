import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";

function PostList({ city, onUpdateCity, onUpdateAllCities }) {
    const [posts, setPosts] = useState([])
    const [filterBy, setFilterBy] = useState('none')
    const { city_id } = useParams()
    const navigate = useNavigate()
    const filterFn = post => filterBy === 'none' ? post : post.category === filterBy
    const sortFn = (a, b) => b.created_at.localeCompare(a.created_at)

    function updateFilterBy(e) {
        setFilterBy(e.target.value)
    }
    
    function deleteCity(city_id) {
        fetch(`http://localhost:9292/cities/${city_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(r => r.json())
        .then(d => {
            onUpdateAllCities('delete', d)
            navigate('/cities')
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        onUpdateCity(city_id)

        fetch(`http://localhost:9292/cities/${city_id}/posts`)
        .then(r => r.json())
        .then(d => setPosts(d))
        .catch(e => console.log(e))
    }, [city_id, onUpdateCity])

    if (city) {
        return (
            <div id='post-list'>
                <div id='city-info'>
                    <img src={city.image} alt='city' />
                    <h3>{city.name}, {city.country}</h3>
                    <p>Pop: {parseInt(city.population).toLocaleString()}</p>
                </div>
                <button id='add-post-btn' onClick={() => navigate(`/cities/${city_id}/posts/new`)}>Add Post</button>
                <form id='filter-posts-form'>
                    <label htmlFor='filter-posts'>Filter by: </label>
                    <select 
                        id='filter-posts'
                        value={filterBy}
                        onChange={updateFilterBy}
                    >
                        <option value='none'>none</option>
                        <option value='general'>general</option>
                        <option value='activity'>activity</option>
                    </select>
                </form>
                <div id='post-container'>
                    {posts.length ? 
                        posts
                            .sort((a, b) => sortFn(a, b))
                            .filter(post => filterFn(post))
                            .map(post => (
                                <Post key={post.id} post={post} />
                            )) 
                        :
                        <div id='no-posts-message'>
                            <h1>No posts for this city</h1>    
                        </div>
                    }
                </div>
                <button id='delete-city-btn' name='delete' onClick={() => deleteCity(city_id)}>Delete City</button>
            </div>
        )
    }
}

export default PostList;
