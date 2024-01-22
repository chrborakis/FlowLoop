// import axios from 'axios';
// import React, { useState, useEffect } from "react";
import axios from 'axios';

import Cookies from 'js-cookie';


const PostComment = ({data, url, onComment, comment, commentRef}) => {
    const postComment = async(e) => {
        console.log("Data: ",data,"Url: ",url, "Comment:",comment )
        await axios.post(`backend/api/post${url}`, data,{
            headers: {'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'application/json'}
        })
            .then(  res => {
                onComment(comment)
                commentRef.current.value = '';
            }).catch( err => console.log(err))
    };

    postComment();
}

export default PostComment;