import React, { useRef} from "react";
import { useAuth } from "../../../store/AuthContext";
import {postComment} from "./CommentsUtils";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Form from 'react-bootstrap/Form';

import '../../../../static/css/Posts/NewComment.css';

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

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control as="textarea" placeholder="Your comment.." 
                    ref={commentRef} rows={1} 
                />
            </Form.Group>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            </Button>
        </Form>
    );
}

export default NewComment;