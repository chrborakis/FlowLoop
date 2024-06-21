import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { postNotification } from '../AppBar/Notifications/NotificationsUtils';

export const getRequests = async( setRequests, company) => {
    await axios.get(`${window.location.origin}/backend/companies/workrequests/${company}`)
    .then( res => setRequests(res.data.data))
    .catch(err => console.log(err))
}

export const replyRequest = async( user, status, setRequests, admin, token) => {
    console.log("User: ", user, " Status: ", status)
    await axios.post(`${window.location.origin}/backend/companies/workrequests/${user}`, {status}, {
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json'}
    })
    .then( res => {
        if(res.status===200){
            console.log(res.data)
            setRequests && setRequests((current) => current.filter((req) => req.id !== user));
            postNotification({user:res.data.data.user, sender:admin,
                message:`You have been accepted to ${res.data.data.company_info.name}`,
                url:`/company/${res.data.data.company_info.slug}`
            }, token)
        }
    })
    .catch(err => console.log(err))
}

export const checkRequest = async( user, updateUser) => {
    axios.get(`${window.location.origin}/backend/users/user/${user?.slug}`)
    .then(  res => {
        if(res.data?.workon)
            updateUser({...user, 'company': res.data.workon.company,'work_id': res.data.workon.id,'is_admin': res.data.workon.is_admin})
        else{
            updateUser({...user, 'company': null,'work_id': null,'is_admin': null,})
        }
    })
    .catch( err => console.log(err))
};