import axios from 'axios';
import React from "react";

const GetComments = ({onFetch, url}) => {
    const getComments = async(e) => {
        axios.get(`backend/${url}`)
        .then( res => 
            // onFetch((prevComments) => [...prevComments, res.data.data])
            onFetch( res.data.data)
        )
        .catch(err => console.log(err.data))
    };

    getComments();
}

export default GetComments;