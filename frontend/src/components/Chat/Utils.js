import axios from 'axios'
import Cookies from 'js-cookie'

export const getFriends = async(user_id, setFriends) => {
    await axios.get(`backend/active_friends/${user_id}`,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
    )
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setFriends(res.data.data)
        }
    })
    .catch(err => console.log(err))
}

export const getMessages = async( user, friend, setMessages) => {
    await axios.get(`backend/chat/conversation/${user}/${friend}`,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        console.log(res.data)
        if(res.data.status===200){
            setMessages(res.data.data)
        }
    }).catch(err => console.log(err))
}


export const sendMessage = async( data, setMessages, setMessage) => {
    const {sender, receiver, message} = data;
    await axios.post(`backend/chat/conversation/${sender}/${receiver}`, data,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        console.log(res.data)
        if(res.data.status===200) {
            setMessages(prevMessaged=>[...prevMessaged, res.data.data])
            setMessage('')
        }
    }).catch(err => console.log(err))
}