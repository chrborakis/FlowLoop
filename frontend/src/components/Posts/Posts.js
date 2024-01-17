import Post from "./Post";
import React, { useState, useEffect } from "react";

const Posts = ({posts}) => {
    return(
        posts.map( post => <Post key={post.id} post={post} />)
    )
}

export default Posts;