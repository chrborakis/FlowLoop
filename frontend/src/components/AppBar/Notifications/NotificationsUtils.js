import axios from 'axios';
import Cookies from "js-cookie";

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

export const readNotification = async( notification, token) => {
    try{
        const res = await axios.patch(`${window.location.origin}/backend/notifications/${notification}`, notification,
            {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
        if(res.data.status === 200) {
        }
    } catch(err) {console.log(err)}
}

export const postNotification = async (notification, token) => {
    try {
        const res = await axios.post(`${window.location.origin}/backend/notifications/0`,notification,
            {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}}
        );

        if (res.data.status === 200) {
            const socket = new WebSocket(`ws://${window.location.host}/ws/notifications/${notification.user}/`);
            if(socket){
                socket.onopen = () => {
                    socket.send(JSON.stringify({type: 'notification', message: notification.message}));
                    socket.close();
                };
                socket.onerror = (error) => console.error('WebSocket error:', error);
            }
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


export const getUnreadRequests = async(user_id, setRequests) => {
    await axios.get(`${window.location.origin}/backend/api/unread_requests_count/${user_id}`,
        {headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.status===200){
            setRequests(res.data.data.length)
        }
    })
    .catch( err => console.log(err.response))
}


// export const readRequests = async( user_id, token) => {
//     try{
//         const res = await axios.patch(`${window.location.origin}/backend/notifications/requests/${user_id}`,
//             {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
//         console.log(res)
//         if(res.data.status === 200) {
//         }
//     } catch(err) {console.log(err)}
// }