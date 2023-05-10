import React from "react";
import { Link } from "react-router-dom";

function Post({ city_id, post }) {
    return (
        <div id='post'>
            <Link 
                to={`/cities/${city_id}/posts/${post.id}`}
            >
                <h3>{post.title}</h3>
            </Link>
            <p>{post.category}</p>
        </div>
    )
}

export default Post;
