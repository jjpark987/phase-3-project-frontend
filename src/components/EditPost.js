import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [editPost, setEditPost] = useState({})
    const { city_id, post_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:9292/posts/${post_id}`)
        .then(r => r.json())
        .then(d => setEditPost({
            category: d.category,
            title: d.title,
            body: d.body
        }))
        .catch(e => console.log(e))
    }, [post_id])

    function updateEditPost(e) {
        setEditPost({ ...editPost, [e.target.name]: e.target.value })
    }

    function submitEditPost(e) {
        e.preventDefault()
        fetch(`http://localhost:9292/cities/${city_id}/posts/${post_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: editPost.category,
                title: editPost.title,
                body: editPost.body
            }) 
        })
        .then(r => r.json())
        .then(d => {
            console.log(d)
            navigate(`/cities/${city_id}/posts/${post_id}`)
        })
        .catch(e => console.log(e))
    }

    return (
        <div id='edit-post'>
            <h1>EditPost</h1>
            <form id='edit-post-form' onSubmit={submitEditPost}>
                <label htmlFor='category'>Category: </label>
                <select 
                    id='category' 
                    name='category'
                    value={editPost.category}
                    onChange={updateEditPost}
                >
                    <option value='general'>General: holistic thoughts/experiences</option>
                    <option value='activity'>Activity: specific activities/events</option>
                </select>
                <label htmlFor='title'>Title: </label>
                <input 
                    id='title' 
                    name='title'
                    required
                    value={editPost.title}
                    onChange={updateEditPost}
                />
                <label htmlFor='body'>Body: </label>
                <textarea 
                    id='body' 
                    name='body'
                    required
                    value={editPost.body}
                    onChange={updateEditPost}
                />
                <button id='submit-edit-post-btn'>Submit Post</button>
            </form>
        </div>
    )
}

export default EditPost;
