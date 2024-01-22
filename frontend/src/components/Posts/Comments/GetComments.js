import axios from 'axios';
import React, { useState, useEffect } from "react";

const GetComments = ({onFetch, url, comments}) => {
    const getComments = async(e) => {
        axios.get(`backend/${url}`)
        .then( res => 
            // onFetch((prevComments) => [...prevComments, res.data.data])
            onFetch( res.data.data)
        )
        .catch(err => console.log(err))
    };

    getComments();
}

export default GetComments;