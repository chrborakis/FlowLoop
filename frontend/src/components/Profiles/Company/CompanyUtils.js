import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const getCompany = async( setData, slug) => {
    axios.get(`/backend/company/${slug}`)
    .then(  res => setData(res.data.data))
    .catch( err => console.log(err))
};

export const get_request = async ( user, user_id, company_id, setRequested) => {
    axios.get(`/backend/id_workrequests/${user_id}`)
    .then(  res => {
        //if visited page = requested page
        console.log("user?.company?.id res.data.data.company",user?.company?.id, res.data.data.company )
        if( company_id!=res.data.data.company) setRequested('No')
        console.log("company_id: ",company_id,
            "res.data.data.company: ",res.data.data.company,
            "res.data.data.status: ",res.data.data.status
        )
        if( company_id == res.data.data.company && res.data.data.status==='P')setRequested('P')
        //if works
        else if( user?.company?.id == res.data.data.company && res.data.data.status==='A')setRequested('A')
    })
    .catch( err => console.log(err))
};  

export const sendWorkRequest = async (user_id, company_id, setRequested) => {
    axios.post('/backend/id_workrequests/0', {
        "user": user_id,
        "company": company_id,
        "status": "P"
    }
    ,{headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
    ).then(  res => {
        setRequested(true)
        // addRequest(res.data);
        console.log(res.data)
        console.log(res.data.work)      //IF WORKS, Update user data in AUTH
    }).catch( err => console.log(err))
};