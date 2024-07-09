import axios from 'axios';
import Cookies from 'js-cookie';
import {postNotification} from '../../AppBar/Notifications/NotificationsUtils'

export const getLikes = async( setLikes, url) => {
    axios.get(url)
    .then(  res => {
        if(res.data.status===200)setLikes(res.data.data)})
    .catch( err => console.log(err))
};

export const postLike = async( url, post, like, liker, author, setLiked, token) => {
    const post_url = url.replace( post, "0")
    const data = { "post": post.post_id, "like": like}
    await axios.post(post_url, data,{
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}
    })
    .then(  res => {
        if(res.data.status===200){
            setLiked((prevValue) => !prevValue)
            const url = post.user.company_slug ? `/company/${post.user.company_slug}/0/post-${post.post_id}` : `/user/${post.user.user_slug}#post-${post.post_id}`
            postNotification({user:author, sender:liker, message:'Liked your post', url:url}, token)
        }
    })
    .catch( err => console.log(err.data))
};