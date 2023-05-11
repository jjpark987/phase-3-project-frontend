import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Link, useParams } from "react-router-dom";

function PostList() {
    const [currentCity, setCurrentCity] = useState({})
    const [posts, setPosts] = useState([])
    const { city_id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/cities/${city_id}/posts`)
        .then(r => r.json())
        .then(d => {
            setCurrentCity(() => d[0].city)
            setPosts(() => d)
        })
        .catch(e => console.log(e))
    }, [city_id])
    
    return (
        <div id='post-list'>
            <h1>PostList</h1>
            <img src={currentCity.image} alt='city' />
            <h3>{currentCity.name}</h3>
            <h3>{currentCity.population}</h3>
            <h3>{currentCity.country}</h3>
            <Link to={`/cities/${city_id}/posts/new`}>
                <button id='new-post-btn'>Add Post</button>
            </Link>
            {posts.map(post => (
                <Post 
                    key={post.id} 
                    city_id={city_id}
                    post={post} 
                />
            ))}
        </div>
    )
}

export default PostList;
