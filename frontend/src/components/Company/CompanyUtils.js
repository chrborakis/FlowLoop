import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const getCompany = async( setData, slug) => {
    axios.get(`/backend/company/${slug}`)
    .then(  res => setData(res.data.data))
    .catch( err => console.log(err))
};

export const get_request = async (work_id, company_id, setRequested) => {
    axios.get(`/backend/api/workrequests/${work_id}`
    ).then(  res => {
        if( company_id == res.data.company)setRequested(true)
    }).catch( err => console.log(err))
};  

export const sendWorkRequest = async (user_id, company_id, setRequested) => {
    axios.post('/backend/workrequests', {
        "user": user_id,
        "company": company_id,
        "status": "P"
    }
    ,{headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
    ).then(  res => {
        setRequested(true)
        console.log(res.data)
        console.log(res.data.work)      //IF WORKS, Update user data in AUTH
    }).catch( err => console.log(err))
};