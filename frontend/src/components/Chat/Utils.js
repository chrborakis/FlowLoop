import axios from 'axios'
import Cookies from 'js-cookie'

export const getFriends = async(user_id, setFriends) => {
    await axios.get(`${window.location.origin}/backend/active_friends/${user_id}`,
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
    // window.location.host
    await axios.get(`${window.location.origin}/backend/chat/conversation/${user}/${friend}`,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        console.log(res.data)
        if(res.data.status===200){
            setMessages(res.data.data)
        }
    }).catch(err => console.log(err))
}

export const getChats = async( user, setChats) => {
    await axios.get(`${window.location.origin}/backend/chat/conversations/${user}`,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        console.log(res.data)
        if(res.data.status===200){
            const messages = res.data.data
            const latestMessages = new Map();
            messages.forEach(message => {
                const key1 = `${message.sender}-${message.receiver}`;
                const key2 = `${message.receiver}-${message.sender}`;

                if (latestMessages.has(key1)) {
                    if (latestMessages.get(key1).send_date < message.send_date) {
                        latestMessages.set(key1, message);
                    }
                } else if (latestMessages.has(key2)) {
                    if (latestMessages.get(key2).send_date < message.send_date) {
                        latestMessages.set(key2, message);
                    }
                } else {
                    latestMessages.set(key1, message);
                }
            });
            const modifiedMessages = Array.from(latestMessages.values());
            console.log(modifiedMessages);
            setChats(modifiedMessages)
        }
    }).catch(err => console.log(err))
}

export const clearUnread = async( user, friend) => {
    await axios.patch(`${window.location.origin}/backend/chat/conversation/${user}/${friend}`,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => console.log(res)
    ).catch(err => console.log(err))
}

export const sendMessage = async( data, setMessages, setMessage, chatSocket) => {
    const {sender, receiver, message} = data;
    await axios.post(`${window.location.origin}/backend/chat/conversation/${sender}/${receiver}`, data,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        console.log(res.data)
        if(res.data.status===200) {
            chatSocket.send(JSON.stringify({
                'message': res.data.data
            }))
            // setMessages(prevMessaged=>[...prevMessaged, res.data.data])
            setMessage('')
        }
    }).catch(err => console.log(err))
}