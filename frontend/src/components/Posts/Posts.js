import Post from "./Post";
import React, { useState, useEffect } from "react";

const Posts = ({posts, url}) => {
    return(
        posts.map( post => <Post key={post.id} post={post} url={url}/>)
    )
}

export default Posts;