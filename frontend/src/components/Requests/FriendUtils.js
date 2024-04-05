import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const getRequests = async( setRequests, user) => {
    await axios.get(`/backend/users/friend_requests/${user}`)
    .then( res => {
        console.log(res.data.data)
        setRequests(res.data.data)})
    .catch(err => console.log(err))
}

export const replyRequest = async( user, req_id, status, setRequests) => {
    console.log("User: ", user, "Req: ", req_id, "Status: ", status)
    await axios.post(`/backend/users/friend_requests/${user}`, 
    {req_id, status}, 
    {
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json'}
    })
    .then( res => {
        console.log(res.data.message)
        setRequests((current) => current.filter((req) => req.id !== user));
    })
    .catch(err => console.log(err))
}

export const replyRequestProfile = async( user, request, status, setRequested) => {
    console.log("User: ", user, "Req: ", request, "Status: ", status)
    await axios.post(`/backend/users/friend_requests/${user}`, {request, status}, 
    {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then( res => {
        console.log(res.data)
        setRequested(status)
    })
    .catch(err => console.log(err))
}