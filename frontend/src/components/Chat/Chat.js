import React, {useState, useEffect, useRef} from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';
import { User } from "../Profiles/Profile";
import { getMessages, sendMessage } from "./Utils";
import { TextField } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import '../../../static/css/chat.css'
import '../../../static/css/index.css'

const Chat = ({chat, setChat}) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const {sender, receiver} = chat;
    const messageEndRef = useRef(null);

    useEffect(()=>{
        console.log('Chat: ' ,chat)
        setMessages([])
        if(chat.receiver){
            getMessages( sender.user_id, receiver.user_id, setMessages);
        }
    },[chat])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleChange = (event) => setMessage(event.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Message: ', message)
        sendMessage({sender:sender.id, receiver:receiver.id, message:message}, setMessages, setMessage)
    }

    const scrollToBottom = () => messageEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return(<>
        <Card className="chat card">
            <Card.Header className="header">
                <Row>
                    <Col><User user={receiver} circle width={75}/></Col>
                    <Col className="d-flex justify-content-end"><CloseButton onClick={()=>setChat(false)}/></Col>
                </Row>
            </Card.Header>
            <Card.Body className="message-container">
                {messages ? messages.map(message => (
                    <div key={message.message_id} className={`message ${message.sender_info.id === sender.user_id ? 'sender' : 'receiver'}`}>
                        {message.message}
                    </div>
                )):(<p>Start conversation</p>)}
                
                <div ref={messageEndRef}/>
                
            </Card.Body>
            <Card.Footer>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={10}>
                            <TextField className="textfield" placeholder="Send a message" name="message"
                                value={message} onChange={handleChange} multiline fullWidth  
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault(); 
                                        handleSubmit(event); 
                                    }
                                }}
                            />
                        </Col>
                        <Col xs={2} className="d-flex align-items-center justify-content-end">
                            <Button variant="contained" className="btn-primary" type="submit" endIcon={<SendIcon />}/>
                        </Col>
                    </Row>
                </Form>
            </Card.Footer>
        </Card>
    </>)
}

export default Chat;