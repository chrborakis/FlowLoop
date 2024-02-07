import axios from 'axios';
import React, { useState, useEffect } from "react";

const GetLikes = ({onFetch, url}) => {
    //${url}likes/${post.post_id}
    const getLikes = async(e) => {
        axios.get(`backend/${url}`)
        .then(  res => {
            onFetch(res.data.data)
        })
        .catch( err => console.log(err))
    };
    getLikes();
}

export default GetLikes;