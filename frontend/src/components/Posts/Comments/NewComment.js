import React, { useRef, useEffect, useState} from "react";
import { useAuth } from "../../../store/AuthContext";
import {postComment} from "./CommentsUtils";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {Form, Row, Col} from 'react-bootstrap';
import { TextField } from "@material-ui/core";
import '../../../../static/css/Posts/NewComment.css';

import '../../../../static/css/index.css'

const NewComment = ({post, onComment, url}) => {
    const { user} = useAuth();

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
        const data = {post:post, commentor, comment: comment}
        postComment(data, url, onComment, comment, setComment);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                    <TextField style={{ marginTop: '5%' }}
                        className="textfield" variant="outlined"
                        placeholder="Type your comment" name="comment" label="What's your opinion?"
                        value={comment} onChange={handleChange}
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