import React from "react";

function NewPost() {
    return (
        <div id='new-post'>
            <h1>NewPost</h1>
            <form>
                <label for='post-category'>Choose a post category: </label>
                <select id='post-category' name='post-category'>
                    <option value='general'>General</option>
                    <option value='activity'>Activity</option>
                </select>
            </form>
        </div>
    )
}

export default NewPost;
