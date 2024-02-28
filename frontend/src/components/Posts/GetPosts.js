import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GetPosts = ({onFetch, url, setLoading, setHasNextPage, currentPage}) => {
    setLoading(true);
    const getData = async(e) => {
        const page_url = url+"/?page="+currentPage
        axios.get(page_url.trim()
        ).then(  res => {
            if( res.data.status === 200){
                onFetch(prevPosts => [...prevPosts, ...res.data.data]);
                setHasNextPage(res.data.has_next);
                // onFetch(res.data.data);
                console.log(res.data.data)
            }
        }).catch( err => {
            setLoading(false);
            console.log(err)
        })
        .finally( err => setLoading(false))
    };

    getData();
}

export default GetPosts;