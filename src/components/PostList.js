import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";

function PostList() {
    const [currentCity, setCurrentCity] = useState({})
    const [posts, setPosts] = useState([])
    const [filterBy, setFilterBy] = useState('none')
    const { city_id } = useParams()
    const navigate = useNavigate()

    const sortFn = (a, b) => b.created_at.localeCompare(a.created_at)
    const filterFn = post => filterBy === 'none' ? post : post.category === filterBy

    function updateFilterBy(e) {
        setFilterBy(e.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:9292/cities/${city_id}/posts`)
        .then(r => r.json())
        .then(d => {
            setCurrentCity(d[0].city)
            setPosts(d)
        })
        .catch(e => console.log(e))
    }, [city_id])
    
    return (
        <div id='post-list'>
            <div id='city-info'>
                <img src={currentCity.image} alt='city' />
                <h3>{currentCity.name}, {currentCity.country}</h3>
                <p>Pop: {parseInt(currentCity.population).toLocaleString()}</p>
            </div>
            <div id='add-post'>
                <button id='add-post-btn' onClick={() => navigate(`/cities/${city_id}/posts/new`)}>Add Post</button>
            </div>
            <div id='filter-posts'>
                <label htmlFor='filter-posts'>Filter by: </label>
                <select 
                    id='filter-posts'
                    value={filterBy}
                    onChange={updateFilterBy}
                >
                    <option value='none'>None</option>
                    <option value='general'>General</option>
                    <option value='activity'>Activity</option>
                </select>
            </div>
            <div id='post-container'>
                {posts.sort((a, b) => sortFn(a, b)).filter(post => filterFn(post)).map(post => (
                    <Post key={post.id} city_id={city_id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default PostList;
