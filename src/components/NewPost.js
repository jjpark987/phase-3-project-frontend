import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewPost() {
    const [newPost, setNewPost] = useState({
        category: '',
        title: '',
        body: ''
    })
    const { city_id } = useParams()
    const navigate = useNavigate()

    function updateNewPost(e) {
        setNewPost({ ...newPost, [e.target.name]: e.target.value })
    }

    function submitNewPost(e) {
        e.preventDefault()
        fetch(`http://localhost:9292/cities/${city_id}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city_id: city_id,
                category: newPost.category,
                title: newPost.title,
                body: newPost.body
            }) 
        })
        .then(r => r.json())
        .then(d => {
            console.log(d)
            navigate(`/cities/${city_id}/posts`)
        })
        .catch(e => console.log(e))
    }

    return (
        <div id='new-post'>
            <h1>NewPost</h1>
            <form id='new-post-form' onSubmit={submitNewPost}>
                <label htmlFor='category'>Category: </label>
                <select 
                    id='category' 
                    name='category'
                    required
                    value={newPost.category}
                    onChange={updateNewPost}
                >
                    <option disabled value=''>Select category</option>
                    <option value='general'>General: holistic thoughts/experiences</option>
                    <option value='activity'>Activity: specific activities/events</option>
                </select>
                <label htmlFor='title'>Title: </label>
                <input 
                   id='title' 
                    name='title'
                    required
                    placeholder='Best Hiking Areas'
                    value={newPost.title}
                    onChange={updateNewPost}
                />
                <label htmlFor='body'>Body: </label>
                <textarea 
                    id='body' 
                    name='body'
                    required
                    placeholder='These are my picks for the top hiking spots...'
                    value={newPost.body}
                    onChange={updateNewPost}
                />
                <button id='submit-new-post-btn'>Submit Post</button>
            </form>
        </div>
    )
}

export default NewPost;
