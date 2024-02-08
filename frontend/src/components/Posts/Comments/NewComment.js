import React, { useRef} from "react";
import { useAuth } from "../../../store/AuthContext";
import {postComment} from "./CommentsUtils";

const NewComment = ({post, onComment, url}) => {
    const { user} = useAuth();
    const commentRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentValue = commentRef.current.value;
        console.log(user.id +" -> ",commentValue);

        const commentor = url.includes('public') ? user.id : user.work_id;
        const data = {post:post, commentor, comment: commentValue}

        postComment(data, url, onComment, commentValue, commentRef);
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