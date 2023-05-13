import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { convertTimestamp } from "../utils";

function PostDetail({ onUpdatePosts }) {
    const [currentPost, setCurrentPost] = useState(null)
    const { city_id, post_id } = useParams()
    const navigate = useNavigate()

    function deletePost(post) {
        fetch(`http://localhost:9292/posts/${post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(d => {
            onUpdatePosts('delete', d)
            navigate(`/cities/${city_id}/posts`)
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        fetch(`http://localhost:9292/posts/${post_id}`)
        .then(r => r.json())
        .then(d => setCurrentPost(d))
        .catch(e => console.log(e))
    }, [post_id])

    if (currentPost) {
        return (
            <div id='post-detail'>
                <h3>{currentPost.city.name}, {currentPost.city.country}</h3>
                <div id='post-info'>
                    <h1>{currentPost.title}</h1>
                    <h3>{currentPost.category}</h3>
                    <h3>{convertTimestamp(currentPost.created_at)}</h3>
                    <p>{currentPost.body}</p>
                </div>
                <button id='edit-post-btn' onClick={() => navigate(`/cities/${city_id}/posts/${post_id}/edit`)}>Edit Post</button>
                <button id='delete-post-btn' onClick={() => deletePost(currentPost)}>Delete Post</button>
            </div>
        )
    }
}

export default PostDetail;
