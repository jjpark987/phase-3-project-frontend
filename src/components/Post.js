import React from "react";
import { Link } from "react-router-dom";
import { convertTimestamp } from "../utils";

function Post({ post }) {
    return (
        <div id='post-item'>
            <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
            </Link>
            <p>{post.category}</p>
            <p>{convertTimestamp(post.created_at)}</p>
        </div>
    )
}

export default Post;
