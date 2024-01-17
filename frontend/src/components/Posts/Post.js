import React, { useState, useEffect } from "react";

const Post = ({post}) => {
    return(
        <div key={post.id} className="card">
            <div className="card-title">
                { post.user.company_name && <h2>{post.user.company_name}</h2>}
                <h3>{post.user.user_name}</h3>
                <p>{post.title}</p>
            </div>
            <div className="card-content">
                <p>{post.body}</p>
            </div>
        </div>
    )
}

export default Post;