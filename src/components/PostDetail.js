import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { convertTimestamp } from "../utils";

function PostDetail() {
    const [currentPost, setCurrentPost] = useState({})
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
            console.log(d)
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

    return (
        <div id='post-detail'>
            <Link to={`/cities/${city_id}/posts`}><p>Back to city</p></Link>
            <div id='post-info'>
                <h1>{currentPost.title}</h1>
                <h3>{currentPost.category}</h3>
                <h3>{convertTimestamp(currentPost.created_at)}</h3>
                <p>{currentPost.body}</p>
            </div>
            <div id='edit-delete-post'>
                <button id='edit-post-btn' onClick={() => navigate(`/cities/${city_id}/posts/${post_id}/edit`)}>Edit Post</button>
                <button id='delete-post-btn' onClick={() => deletePost(currentPost)}>Delete Post</button>
            </div>
        </div>
    )
}

export default PostDetail;
