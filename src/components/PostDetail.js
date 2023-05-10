import React from "react";

function PostDetail({ currentPost }) {
    return (
        <div id='post-detail'>
            <h1>{currentPost.title}</h1>
            <h3>{currentPost.category}</h3>
            <p>{currentPost.body}</p>
        </div>
    )
}

export default PostDetail;
