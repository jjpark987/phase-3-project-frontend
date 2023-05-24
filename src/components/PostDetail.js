import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
            <div id='post-detail' className='component'>
                <Link to={`/cities/${post.city.id}/posts`}>{post.city.name}, {post.city.country}</Link>
                <div id='post-info'>
                    <h1>{post.title}</h1>
                    <h3>{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</h3>
                    <em>{convertTimestamp(post.created_at)}</em>
                    <p>{post.body}</p>
                </div>
                <button className='btn' onClick={() => navigate(`/posts/${post_id}/edit`)}>Edit Post</button>
                <button className='delete-btn' onClick={() => deletePost(post)}>Delete Post</button>
            </div>
        )
    }
}

export default PostDetail;
