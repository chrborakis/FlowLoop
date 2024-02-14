import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const getUser = async( setData, setWork, slug) => {
    axios.get(`/backend/user/${slug}`)
    .then(  res => {
        setData(res.data.data)
        setWork(res.data.workon)
    })
    .catch( err => console.log(err))
};