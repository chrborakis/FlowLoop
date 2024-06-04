import axios from 'axios';
import Cookies from 'js-cookie';

export const getComments = async( setComments, url) => {
    // url = /backend/comments
    axios.get(url)
    .then( res => setComments( res.data.data))
    .catch(err => console.log(err.data))
};

export const postComment = async( data, url, setComment, comment, setText, token) => {
    await axios.post(`${url}/0`, data,{
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}
    })
    .then(  res => {
        setComment(comment)
        // commentRef.current.value = '';
        setText('');
    }).catch( err => console.log(err))
};