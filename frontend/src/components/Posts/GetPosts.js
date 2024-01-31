import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GetPosts = ({onFetch, url, setLoading}) => {
    const getData = async(e) => {
        console.log('URL-> ', url)
        axios.get(`backend/${url}`,{
            headers: {'X-CSRFToken': Cookies.get('csrftoken')}
        }).then(  res => {
            onFetch(prevPosts => [...prevPosts, ...res.data.data]);
            console.log(res.data.data)
        }).catch( err => console.log(err))
        .finally( err => setLoading(false))
    };

    getData();
}

export default GetPosts;