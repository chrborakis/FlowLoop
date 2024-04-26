import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const getRequests = async( setRequests, user) => {
    await axios.get(`/backend/users/friend_requests/${user}`)
    .then( res => {
        console.log(res.data)
        setRequests(res.data.data)})
    .catch(err => console.log(err))
}

export const replyRequest = async( sender, receiver, status, setRequests) => {
    console.log(sender,receiver)
    await axios.post(`/backend/users/friend_requests/${receiver}`, 
    { sender:sender, receiver:receiver, status}, 
    {
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json'}
    })
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setRequests((current) => current.filter((req) => req.id !== res.data.id));
        }
    })
    .catch(err => console.log(err))
}

export const replyRequestProfile = async( sender, receiver, status, setRequested) => {
    console.log("sender: ", sender," receiver: ", receiver," status: ", status)
    await axios.post(`/backend/users/friend_requests/${sender.id}`, { sender:receiver, receiver:sender.id, status}, 
    {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then( res => {
        console.log("REPLY: ",res.data)
        if(res.data.status === 200) {
            setRequested(status)

        }
    })
    .catch(err => console.log(err))
}