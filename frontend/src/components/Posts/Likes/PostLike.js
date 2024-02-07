import axios from 'axios';
import Cookies from 'js-cookie';


const PostLike = ({ url, post_id, like_id, setLiked}) => {
    const postLike = async(e) => {
        const post_url = url.replace(post_id, "0")
        const data = { "post":post_id, "like": like_id}

        // url={`${url}likes/${post.post_id}`}
        await axios.post(`backend/${post_url}`, data,{
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