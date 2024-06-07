import axios from 'axios';
import Cookies from "js-cookie";

export const getUnreadNotifications = async(user_id, setNotifications) => {
    await axios.get(`${window.location.origin}/backend/api/unread_notifications_count/${user_id}`,
        { headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.status===200)setNotifications(res.data)
    })
    .catch( err => console.log(err))
}

export const readNotification = async(notification) => {
    await axios.patch(`${window.location.origin}/backend/notifications/${notification}`,
        {headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then(  res => {
        console.log(res)
    })
    .catch( err => console.log(err.response))
}

export const postNotification = async(notification, token) => {
    await axios.post(`${window.location.origin}/backend/notifications/0`, notification,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then(  res => console.log(res))
    .catch( err => console.log(err.response))
}

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