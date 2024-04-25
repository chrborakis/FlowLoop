import axios from 'axios'
import Cookies from 'js-cookie'

export const getFriends = async(user_id, setFriends) => {
    await axios.get(`backend/active_friends/${user_id}`,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
    )
    .then( res => {
        console.log(res.data)
    })
    .catch(err => console.log(err))
}