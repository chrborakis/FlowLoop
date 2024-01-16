import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const GetPosts = ({onFetch}) => {
    const getData = async(e) => {
        try {
            const response = await axios.get('/backend/postspublic', 
            {
                headers: {'X-CSRFToken': Cookies.get('csrftoken'),},
            });
            onFetch(response.data.data);
        }catch (error) {
            console.error('Error in Fetch Posts Public: ', error);
        }
    }

    useEffect(() => {
        getData();
      }, []);
    return(<></>)
}

export default GetPosts;