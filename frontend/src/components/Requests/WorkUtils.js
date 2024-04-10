import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const getRequests = async( setRequests, company) => {
    await axios.get(`/backend/companies/workrequests/${company}`)
    .then( res => setRequests(res.data.data))
    .catch(err => console.log(err))
}

export const replyRequest = async( user, status, setRequests) => {
    console.log("User: ", user, " Status: ", status)
    await axios.post(`/backend/companies/workrequests/${user}`, {status}, {
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json'}
    })
    .then( res => {
        console.log(res.data.message)
        setRequests((current) => current.filter((req) => req.id !== user));
    })
    .catch(err => console.log(err))
}

export const checkRequest = async( user, updateUser) => {
    axios.get(`/backend/users/user/${user?.slug}`)
    .then(  res => {
        if(res.data?.workon)
            updateUser({
                ...user, 
                'company': res.data.workon.company,
                'work_id': res.data.workon.id,
                'is_admin': res.data.workon.is_admin
            })
        else{
            updateUser({
                ...user, 
                'company': null,
                'work_id': null,
                'is_admin': null,
            })
        }
        console.log('[UPT]', res.data)
    })
    .catch( err => console.log(err))
};