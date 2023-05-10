import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";

function PostList({ currentCity, onSelectPost }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/cities/${currentCity.id}/posts`)
        .then(r => r.json())
        .then(d => setPosts(d))
    }, [currentCity.id])

    return (
        <div id='post-list'>
            <h1>PostList</h1>
            <Link to={`/cities/${currentCity.id}/posts/new`}>
                <button>Add Post</button>
            </Link>
            {posts.map(post => (
                <Post 
                    key={post.id} 
                    post={post} 
                    currentCity={currentCity}
                    onSelectPost={onSelectPost}
                />
            ))}
        </div>
    )
}

export default PostList;
