import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function PostDetail() {
    const [currentPost, setCurrentPost] = useState({})
    const { city_id, post_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:9292/posts/${post_id}`)
        .then(r => r.json())
        .then(d => setCurrentPost(() => d))
        .catch(e => console.log(e))
    }, [post_id])

    function deletePost(post) {
        fetch(`http://localhost:9292/posts/${post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(d => {
            console.log(d)
            navigate(`/cities/${city_id}/posts`)
        })
        .catch(e => console.log(e))
    }

    return (
        <div id='post-detail'>
            <h1>PostDetail</h1>
            <h1>{currentPost.title}</h1>
            <h3>{currentPost.category}</h3>
            <h3>{currentPost.created_at}</h3>
            <p>{currentPost.body}</p>
            <Link to={`/cities/${city_id}/posts/${post_id}/edit`}>
                <button id='edit-post-btn'>Edit Post</button>
            </Link>
            <button id='delete-post-btn' onClick={() => deletePost(currentPost)}>Delete Post</button>
            <Link to={`/cities/${city_id}/posts`}><p>Back to list</p></Link>
        </div>
    )
}

export default PostDetail;
