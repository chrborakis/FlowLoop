import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GetPosts = ({onFetch, url,setLoading}) => {
    const getData = async(e) => {
        try {
            const response = await axios.get(`backend/${url}`, 
            {
                headers: {'X-CSRFToken': Cookies.get('csrftoken'),},
            });
            onFetch(prevPosts => [...prevPosts, ...response.data.data]);
            setLoading(false);
        }catch (error) {
            console.error(`Error in Fetch  Public Posts: `, error.data);
            setLoading(false);
        }
    }
    getData();
}

export default GetPosts;