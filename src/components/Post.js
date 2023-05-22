import React from "react";
import { Link } from "react-router-dom";
import { convertTimestamp } from "../utils";

function Post({ post }) {
    return (
        <div id='post-item'>
            <div>
                <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <p>{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</p>
            </div>
            <em>{convertTimestamp(post.created_at)}</em>
        </div>
    )
}

export default Post;
