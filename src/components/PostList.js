import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";

function PostList({ posts, onInitializePosts }) {
    const [filterBy, setFilterBy] = useState('none')
    const { city_id } = useParams()
    const navigate = useNavigate()
    const filterFn = post => filterBy === 'none' ? post : post.category === filterBy
    const sortFn = (a, b) => b.created_at.localeCompare(a.created_at)

    function updateFilterBy(e) {
        setFilterBy(e.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:9292/cities/${city_id}/posts`)
        .then(r => r.json())
        .then(d => onInitializePosts(d))
        .catch(e => console.log(e))
    }, [city_id, onInitializePosts])

        if (!posts.length) {
            return (
                <div id='no-posts-messge'>
                    <h1>Sorry no posts for this city</h1>
                </div>
            )
        }

    return (
        <div id='post-list'>
            <div id='city-info'>
                <img src={posts[0].city.image} alt='city' />
                <h3>{posts[0].city.name}, {posts[0].city.country}</h3>
                <p>Pop: {parseInt(posts[0].city.population).toLocaleString()}</p>
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
                {posts.sort((a, b) => sortFn(a, b)).filter(post => filterFn(post)).map(post => (
                    <Post key={post.id} city_id={city_id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default PostList;
