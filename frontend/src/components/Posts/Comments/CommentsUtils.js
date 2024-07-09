import axios from 'axios';
import Cookies from 'js-cookie';
import { postNotification } from '../../AppBar/Notifications/NotificationsUtils';

export const getComments = async( setComments, url) => {
    // url = /backend/comments
    axios.get(url)
    .then( res => setComments( res.data.data))
    .catch(err => console.log(err.data))
};

export const postComment = async( data, url, setComment, comment, setText, post, token) => {
    console.log(token)
    await axios.post(`${url}/0`, data,{
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}
    })
    .then(  res => {
        if(res.data.status===200){
            setComment(comment)
            setText('');
            const url = post.user.company_slug ? `/company/${post.user.company_slug}/0/post-${post.post_id}` : `/user/${post.user.user_slug}#post-${post.post_id}`
            postNotification({user:post.user.user_id, sender:res.data.data.user.id, message:'Commented your post', url:url}, token)
        }
    }).catch( err => console.log(err))
};