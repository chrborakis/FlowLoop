import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {postNotification} from '../AppBar/Notifications/NotificationsUtils';

export const getRequests = async( setRequests, user) => {
    await axios.get(`${window.location.origin}/backend/users/friend_requests/${user}`)
    .then( res => {
        console.log(res.data)
        setRequests(res.data.data)})
    .catch(err => console.log(err))
}

export const replyRequest = async( sender, info, receiver, status, setRequests, token) => {
    await axios.post(`${window.location.origin}/backend/users/friend_requests/${receiver.id}`, { sender:sender, receiver:receiver.id, status}, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then( res => {
        if(res.data.status === 200){
            setRequests((current) => current.filter((req) => req.id !== res.data.id));
            if(status==='A'){
                postNotification({user:sender, sender:receiver.id,
                    message:'Accepted your friend request', url:`/user/${info.slug}`
                }, token)
            }
        }
    })
    .catch(err => console.log(err))
}

export const replyRequestProfile = async( sender, receiver, status, setRequested, token) => {
    await axios.post(`${window.location.origin}/backend/users/friend_requests/${sender.id}`, { sender:receiver.id, receiver:sender.id, status}, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then( res => {
        if(res.data.status === 200) {
            setRequested(status)
            if(status==='A'){
                postNotification({user:receiver.id, sender:sender.id,
                    message:'Accepted your friend request', url:`/user/${sender.slug}`
                }, token)
            }
        }
    })
    .catch(err => console.log(err))
}