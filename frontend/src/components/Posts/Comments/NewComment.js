import React, { useRef, useEffect, useState} from "react";
import { useAuth } from "../../../store/AuthContext";
import {postComment} from "./CommentsUtils";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {Form, Row, Col} from 'react-bootstrap';
import { TextField } from "@material-ui/core";
import '../../../../static/css/Posts/NewComment.css';

import '../../../../static/css/index.css'
import { useNotification } from "../../../store/NotificationContext";

const NewComment = ({post, onComment, url}) => {
    const { user} = useAuth();
    const { addNotification} = useNotification();

    const [comment, setComment] = useState("");

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        if(!comment){
            return
        }
        const commentor = url.includes('public') ? user.id : user.work_id;
        const data = {post:post.post_id, commentor, comment: comment}
        postComment(data, url, onComment, comment, setComment, post, addNotification, user?.token);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                    <TextField onKeyDown={(event) => {if (event.key === 'Enter') {event.preventDefault(); handleSubmit(event); }}}
                        className="textfield" value={comment} onChange={handleChange}
                        placeholder="Type your comment" name="comment" label="What's your opinion?"
                        multiline fullWidth  
                    />
                </Col>
                <Col xs={2} className="d-flex align-items-center justify-content-end">
                    <Button variant="contained" className="btn-primary" type="submit" endIcon={<SendIcon />}/>
                </Col>
            </Row>
        </Form>
    );
}

export default NewComment;