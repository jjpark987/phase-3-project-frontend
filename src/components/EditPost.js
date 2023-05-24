import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPost({ post, onUpdatePost, onUpdateAllPosts }) {
    const [editPost, setEditPost] = useState({
        category: '',
        title: '',
        body: ''
    })
    const { post_id } = useParams()
    const navigate = useNavigate()

    function updateEditPost(e) {
        setEditPost({ ...editPost, [e.target.name]: e.target.value })
    }

    function submitEditPost(e) {
        e.preventDefault()
        fetch(`http://localhost:9292/posts/${post_id}`, {
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
            onUpdateAllPosts('patch', d)
            navigate(`/posts/${post_id}`)
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        onUpdatePost(post_id)

        fetch(`http://localhost:9292/posts/${post_id}`)
        .then(r => r.json())
        .then(d => {
            setEditPost({
                category: d.category,
                title: d.title,
                body: d.body
            })
        })
        .catch(e => console.log(e))
    }, [post_id, onUpdatePost])

    if (post) {
        return (
            <div id='edit-post' className='component'>
                <Link to={`/cities/${post.city.id}/posts`}>{post.city.name}, {post.city.country}</Link>
                <h1>Edit Post</h1>
                <form className='form' onSubmit={submitEditPost}>
                    <label htmlFor='edit-post-category'>Category: </label>
                    <select 
                        id='edit-post-category' 
                        className='form-element'
                        name='category'
                        value={editPost.category}
                        onChange={updateEditPost}
                    >
                        <option value='general'>General: holistic thoughts/experiences</option>
                        <option value='activity'>Activity: specific activities/events</option>
                    </select>
                    <label htmlFor='edit-post-title'>Title: </label>
                    <input 
                        id='edit-post-title' 
                        className='form-element input'
                        name='title'
                        required
                        value={editPost.title}
                        onChange={updateEditPost}
                    />
                    <label htmlFor='edit-post-body'>Body: </label>
                    <textarea 
                        id='edit-post-body' 
                        className='form-element textarea'
                        name='body'
                        required
                        value={editPost.body}
                        onChange={updateEditPost}
                    />
                    <button className='btn'>Submit Post</button>
                </form>
            </div>
        )
    }
}

export default EditPost;
