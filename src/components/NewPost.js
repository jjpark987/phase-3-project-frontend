import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function NewPost({ cities, onUpdateCities }) {
    const [newPost, setNewPost] = useState({})
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
            onUpdateCities('post post', d)
            navigate(`/cities/${city_id}/posts`)
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        setNewPost({
            category: '',
            title: '',
            body: '',
            city: cities.find(city => city.id === parseInt(city_id))
        })
    }, [cities, city_id])

    if (newPost.city) {
        return (
            <div id='new-post' className='component'>
                <Link to={`/cities/${newPost.city.id}/posts`}>{newPost.city.name}, {newPost.city.country}</Link>
                <h1>New Post</h1>
                <form className='form' onSubmit={submitNewPost}>
                    <label htmlFor='new-post-category'>Category: </label>
                    <select 
                        id='new-post-category' 
                        className='form-element'
                        name='category'
                        required
                        value={newPost.category}
                        onChange={updateNewPost}
                    >
                        <option disabled value=''>Select category</option>
                        <option value='general'>General: thoughts/experiences</option>
                        <option value='activity'>Activity: specific activities/events</option>
                    </select>
                    <label htmlFor='new-post-title'>Title: </label>
                    <input 
                        id='new-post-title' 
                        className='form-element input'
                        name='title'
                        required
                        placeholder='ex. Best Hiking Trails'
                        value={newPost.title}
                        onChange={updateNewPost}
                    />
                    <label htmlFor='new-post-body'>Body: </label>
                    <textarea 
                        id='new-post-body' 
                        className='form-element textarea'
                        name='body'
                        required
                        placeholder='ex. These are my picks for the top hiking spots...'
                        value={newPost.body}
                        onChange={updateNewPost}
                    />
                    <button className='btn'>Submit Post</button>
                </form>
            </div>
        )
    } 
}

export default NewPost;
