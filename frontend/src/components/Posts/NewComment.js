import React, { useRef} from "react";
import axios from 'axios';
import { useAuth } from "../../store/AuthContext";
import Cookies from 'js-cookie';


const NewComment = ({post}) => {
    const { user} = useAuth();

    const commentRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentValue = commentRef.current.value;
        console.log(user.id +" -> ",commentValue);
        const data = {post:post,commentor:user.id, comment: commentValue}
        await axios.post('backend/api/postpubliccomments', data,{
            headers: {'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'application/json'}
        })
            .then(  res => console.log(res))
            .catch( err => console.log(err))
        commentRef.current.value = '';
    }




    return(<div>
        <form onSubmit={handleSubmit}>
            <label>Your Comment
                <input type="text" name="comment" ref={commentRef}/>
            </label>
            <button>Submit</button>
        </form>
    </div>);
}

export default NewComment;