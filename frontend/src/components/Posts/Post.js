import React, { useState, useEffect } from "react";
import Comments from "./Comments/Comments";
import Likes from "./Likes";

const Post = ({post, url, ready}) => {
    return(
        <div key={post.post_id} className="card">
            <div className="card-title">
                { post.user.company_name && <h2>{post.user.company_name}</h2>}
                <h3>{post.user.user_name}</h3>
                <p>{post.title}</p>
            </div>
            <div className="card-content">
                <p>{post.body}</p>
            </div>
            <div className="comments">
                <hr></hr>
                <Likes    post={post.post_id} url={url.like+post.post_id}/>
                <hr></hr>
                <Comments post={post.post_id} url={url.comment}/>
            </div>
        </div>
    )
}

export default Post;