import React, {useEffect} from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export const getUserInfo = async( user_id, updateUser) => {
    axios.get(`/backend/user_info/${user_id}`)
    .then(  res => {
        if(res.status === 200){
            updateUser(res.data.data)
        }
    })
    .catch( err => console.log(err))
}

export const getMessages = async(user_id, setMessages) => {
    axios.get(`/backend/api/unread_messages_count/${user_id}`)
    .then(  res => {
        if(res.status===200)setMessages(res.data)
    })
    .catch( err => console.log(err))
}