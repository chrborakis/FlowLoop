// import axios from 'axios';
// import React, { useState, useEffect } from "react";
import axios from 'axios';

import Cookies from 'js-cookie';


const PostComment = ({data, url, onComment, comment, commentRef}) => {
    const postComment = async(e) => {
        await axios.post(`backend/${url}/0`, data,{
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