import React, {useEffect} from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export const getUserInfo = async( user_id, updateUser) => {
    await axios.get(`${window.location.origin}/backend/user_info/${user_id}`,
        {headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.status === 200){
            updateUser(res.data.data)
        }
    })
    .catch( err => console.log(err))
}

export const getUnreadMessages = async(user_id, setMessages) => {
    await axios.get(`${window.location.origin}/backend/api/unread_messages_count/${user_id}`,
        { headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.status===200)setMessages(res.data)
    })
    .catch( err => console.log(err))
}

