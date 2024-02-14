import React from "react";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
import { Link } from "react-router-dom";

import '../../../static/css/Post.css';

const Post = ({post, url}) => {
    return(
        <div key={post.post_id} className="card">
            <div className="card-title">
                { post.user?.company_name && 
                    <Link to={`/company/${post.user?.company_slug}`}>
                        <h2>{post.user?.company_name}</h2>
                    </Link>
                }
                    <Link to={`/user/${post.user?.user_slug}`}>
                        <h3>{post.user?.user_name}</h3>
                    </Link>
                <p>{post.title}</p>
                <div>
                    <h6>{post.publish_date}</h6>
                </div>
                {
                    post.image &&
                    <div className="container">
                        <div className="image-wrapper">
                        <img src={post.image} alt=""/>
                        </div>
                    </div>
                } 
                
            </div>
            <div className="card-content">
                <p>{post.body}</p>
            </div>
            <div className="comments">
                <hr></hr>

                <Likes post={post.post_id} url={`${url}likes/${post.post_id}`}/>
                <hr></hr>
                <Comments post={post.post_id} url={`${url}comments`}/>
            </div>
        </div>
    )
}

export default Post;