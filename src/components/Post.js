import React from "react";
import { Link } from "react-router-dom";
import { convertTimestamp } from "../utils";

function Post({ city_id, post }) {
    return (
        <div id='post-item'>
            <Link to={`/cities/${city_id}/posts/${post.id}`}>
                <h3>{post.title}</h3>
            </Link>
            <p>{post.category}</p>
            <p>{convertTimestamp(post.created_at)}</p>
        </div>
    )
}

export default Post;
