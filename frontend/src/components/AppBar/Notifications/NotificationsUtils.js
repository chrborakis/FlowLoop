import axios from 'axios';
import Cookies from "js-cookie";
import { useContext } from 'react';
import { NotificationContext } from '../../../store/NotificationContext';

export const getUnreadNotifications = async(user_id, setNotifications) => {
    await axios.get(`${window.location.origin}/backend/api/unread_notifications_count/${user_id}`,
        { headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.status===200){
            setNotifications && setNotifications(res.data)
            return res.data
        }
    })
    .catch( err => console.log(err))
}

export const readNotification = async( notification, delNotification, token) => {
    try{
        const res = await axios.patch(`${window.location.origin}/backend/notifications/${notification}`, notification,
            {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
        if(res.data.status === 200) {
            delNotification();
        }
    } catch(err) {console.log(err)}
}

export const postNotification = async (notification, token) => {
    try {
        const res = await axios.post(`${window.location.origin}/backend/notifications/0`,notification,
            {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}}
        );

        if (res.data.status === 200) {
            console.log('Notification posted successfully:', res.data);
        }
    } catch (err) {
        console.error('Error posting notification:', err);
    }
};

export const getNotifications = async(user_id, setNotifications) => {
    await axios.get(`${window.location.origin}/backend/notifications/${user_id}`,
        {headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then(  res => {
        console.log(res)
        if(res.data.status === 200){
            setNotifications(res.data.data)
        }
    })
    .catch( err => console.log(err.response))
}