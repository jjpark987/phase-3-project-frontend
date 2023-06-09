import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";

function PostList({ cities, onUpdateCities }) {
    const [city, setCity] = useState({})
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
            onUpdateCities('delete city', d)
            navigate('/cities')
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        setCity(cities.find(city => city.id === parseInt(city_id)))
    }, [cities, city_id])

    if (city) {
        return (
            <div id='post-list' className='component'>
                <div id='city-info'>
                    <img 
                        src={city.image} 
                        alt='city' 
                        width='200px' 
                    />
                    <h3>{city.name}, {city.country}</h3>
                    <p>Pop: {parseInt(city.population).toLocaleString()}</p>
                </div>
                <button className='add-btn' onClick={() => navigate(`/cities/${city_id}/posts/new`)}>Add Post</button>
                <form>
                    <label htmlFor='filter-posts' className='form-label'>Filter by: </label>
                    <select 
                        id='filter-posts'
                        value={filterBy}
                        onChange={updateFilterBy}
                    >
                        <option value='none'>None</option>
                        <option value='general'>General</option>
                        <option value='activity'>Activity</option>
                    </select>
                </form>
                <div className='container'>
                    {city.posts && city.posts.length ? 
                        city.posts
                            .sort((a, b) => sortFn(a, b))
                            .filter(post => filterFn(post))
                            .map(post => (
                                <Post key={post.id} post={post} />
                            )) 
                        :
                        <h1>No posts for this city</h1>
                    }
                </div>
                <button className='delete-btn' onClick={() => deleteCity(city_id)}>Delete City</button>
            </div>
        )
    }
}

export default PostList;
