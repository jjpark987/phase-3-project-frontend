import React from "react";
import { Link } from "react-router-dom";

function Post({ post, currentCity, onSelectPost }) {
    return (
        <div id='post'>
            <Link 
                to={`/cities/${currentCity.id}/posts/${post.id}`}
                onClick={() => onSelectPost(post)}
            >
                <h3>{post.title}</h3>
            </Link>
            <p>{post.category}</p>
        </div>
    )
}

export default Post;
