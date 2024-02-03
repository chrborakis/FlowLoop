import axios from 'axios';
import Cookies from 'js-cookie';


const PostLike = ({ url, post_id, like_id, setLiked}) => {
    const postLike = async(e) => {
        const post_url = url.replace(post_id, "")
        const data = { "post":post_id, "like": like_id}

        await axios.post(`backend/api/${post_url}`, data,{
            headers: {'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'application/json'}
        })
            .then(  res => {
                setLiked((prevValue) => !prevValue)
            }).catch( err => console.log(err.data))
    };

    postLike();
}

export default PostLike;