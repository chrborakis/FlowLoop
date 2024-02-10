import axios from 'axios';
import Cookies from 'js-cookie';

export const getLikes = async( setLikes, url) => {
    axios.get(url)
    .then(  res => setLikes(res.data.data))
    .catch( err => console.log(err))
};

export const postLike = async( url, post, like, setLiked) => {
    const post_url = url.replace( post, "0")
    const data = { "post": post, "like": like}
    console.log("PostLike -> ", post_url)
    // url={`${url}likes/${post.post_id}`}
    await axios.post(post_url, data,{
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json'}
    })
        .then(  res => setLiked((prevValue) => !prevValue))
        .catch( err => console.log(err.data))
};