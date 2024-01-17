import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const GetPosts = ({onFetch, url}) => {
    const getData = async(e) => {
        try {
            const response = await axios.get(`/backend/${url}`, 
            {
                headers: {'X-CSRFToken': Cookies.get('csrftoken'),},
            });
            onFetch(response.data.data);
            console.log(response.data.data)
        }catch (error) {
            console.error('Error in Fetch Posts Public: ', error);
        }
    }
        getData();
}

export default GetPosts;