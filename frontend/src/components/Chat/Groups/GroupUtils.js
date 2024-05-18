import axios from 'axios'
import Cookies from 'js-cookie'

export const getGroups = async(user_id, setGroups) => {
    await axios.get(`${window.location.origin}/backend/groups/${user_id}`,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
    )
    .then( res => {
        if(res.data.status === 200){
            setGroups(res.data.data)
        }
    })
    .catch(err => console.log(err))
}

export const sendGroupMessage = async( data, setMessages, setMessage, socket) => {
    await axios.post(`${window.location.origin}/backend/groups/conversation/${data.group}`, data,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        if(res.data.status===200) {
            socket.send(JSON.stringify({'message': res.data.data}))
            // setMessages(prevMessaged=>[...prevMessaged, res.data.data])
            setMessage('')
        }
    }).catch(err => console.log(err))
}

export const getGroupMessages = async( group, setMessages) => {
    // window.location.host
    await axios.get(`${window.location.origin}/backend/groups/conversation/${group}`,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        console.log(res.data)
        if(res.data.status===200){
            setMessages(res.data.data)
        }
    }).catch(err => console.log(err))
}

export const removeMember = async( memberToRemove, setMembers) => {
    await axios.delete(`${window.location.origin}/backend/groups/members/${memberToRemove}`,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'application/json'}
    }).then( res => {
        console.log(res.data)
        if(res.data.status===200){
            setMembers((prevMembers) =>
                prevMembers.filter((m) => m.member !== memberToRemove)
            );
        }
    }).catch(err => console.log(err))
}

export const updateGroupMembers = async( group_id, setMembers, setAdmins) => {
    await axios.get(`${window.location.origin}/backend/groups/group/${group_id}`,{
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type':'application/json'}
    }).then( res=> {
        console.log(res.data)
        const { members, admins} = res.data.data
        if(res.data.status === 200){
            setMembers(members)
            setAdmins( admins)
        }
    }).catch(err => console.log(err))
}