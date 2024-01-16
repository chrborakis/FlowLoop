import React, { useState, useEffect } from "react";
import GetPosts from "./GetPosts";
import '../../static/css/HomePage.css'

const HomePage = ({user}) => {
    const [ posts, setPosts] = useState([]);

    return(
        <div className="body">
            <h1>HomePage</h1>
            <GetPosts onFetch={setPosts} />
            { posts ? (
                posts.map( post => {
                    {console.log(post)}
                    return(
                        <div key={post.id} className="card">
                            <div className="card-title">
                                <h3>{post.user.name}</h3>
                                <p>{post.title}</p>
                            </div>
                            <div className="card-content">
                                <p>{post.body}</p>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div>
                    <p>Loading posts...</p>
                </div>
            )}
            
        </div>
    )
}

export default HomePage; 