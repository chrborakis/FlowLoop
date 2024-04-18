import React, { useRef, useEffect, useState} from "react";
import { useAuth } from "../../../store/AuthContext";
import {postComment} from "./CommentsUtils";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Form from 'react-bootstrap/Form';

import '../../../../static/css/Posts/NewComment.css';

const NewComment = ({post, onComment, url}) => {
    const { user} = useAuth();

    const [text, setText] = useState("");
    const commentRef = useRef(null);

    const handleChange = (event) => {
        setText(event.target.value);
        adjustTextareaRows(); // Adjust the number of rows
    };

    const adjustTextareaRows = () => {
        if (!commentRef.current) return;
        const textarea = commentRef.current;
        textarea.style.height = 'auto'; // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && commentRef.current.value.trim() !== '') {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        const commentValue = commentRef.current.value.trim();
        const commentor = url.includes('public') ? user.id : user.work_id;
        const data = {post:post, commentor, comment: commentValue}
        postComment(data, url, onComment, commentValue, commentRef, setText);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control as="textarea" value={text} required
                    placeholder="Your comment.."
                    onChange={handleChange} onKeyDown={handleKeyDown}
                    ref={commentRef}
                    rows={1} style={{ resize: "none" }}
                />
            </Form.Group>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            </Button>
        </Form>
    );
}

export default NewComment;