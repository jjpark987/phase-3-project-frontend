import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { convertTimestamp } from "../utils";

function PostDetail({ post, onUpdatePost, onUpdateAllPosts }) {
    const { post_id } = useParams()
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
            onUpdateAllPosts('delete', d)
            navigate(`/cities/${post.city.id}/posts`)
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        onUpdatePost(post_id)
    }, [post_id, onUpdatePost])

    if (post) {
        return (
            <div id='post-detail'>
                <h3>{post.city.name}, {post.city.country}</h3>
                <div id='post-info'>
                    <h1>{post.title}</h1>
                    <h3>{post.category}</h3>
                    <h3>{convertTimestamp(post.created_at)}</h3>
                    <p>{post.body}</p>
                </div>
                <button id='edit-post-btn' onClick={() => navigate(`/posts/${post_id}/edit`)}>Edit Post</button>
                <button id='delete-post-btn' onClick={() => deletePost(post)}>Delete Post</button>
            </div>
        )
    }
}

export default PostDetail;
