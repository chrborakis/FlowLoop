import React, {useState, useEffect, useRef} from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';
import { User } from "../Profiles/Profile";
import { getMessages, sendMessage } from "./Utils";
import { TextField } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { dateFormat } from "../Extra/Date";

import '../../../static/css/chat.css'
import '../../../static/css/index.css'

const Chat = ({chat, setChat}) => {
    const [chatSocket, setSocket] = useState(new WebSocket(`ws://${window.location.host}/ws/socket-server/`));

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const {sender, receiver} = chat;
    const messageEndRef = useRef(null);
 
    useEffect(()=>{
        chatSocket.onmessage = function(e){
            let data = JSON.parse(e.data)
            console.log('Data: ', data)
    
            if(data.type ==='chat'){
                setMessages(prevMessaged=>[...prevMessaged, data.message])
            }
        }
    },[chatSocket])
    

    

    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const handleMouseEnter = (messageId) => setHoveredMessageId(messageId);
    const handleMouseLeave = () => setHoveredMessageId(null);

    useEffect(()=>{
        setMessages([])
        if(chat.receiver)getMessages( sender.user_id, receiver.user_id, setMessages);
    },[chat])

    useEffect(() => {scrollToBottom();}, [messages]);

    const handleChange = (event) => setMessage(event.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Message: ', message)
        sendMessage({sender:sender.id, receiver:receiver.id, message:message}, setMessages, setMessage, chatSocket)
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
                    <>
                        <div key={message.message_id} className={`message ${message.sender_info.id === sender.user_id ? 'sender' : 'receiver'}`} onMouseEnter={() => handleMouseEnter(message.message_id)} onMouseLeave={handleMouseLeave}>
                            {message.message}
                        </div>
                        {hoveredMessageId === message.message_id && (
                            <span className={`message-date ${message.sender_info.id === sender.user_id ? 'sender-date' : 'receiver-date'}`}>
                                {dateFormat(message.send_date)}
                            </span>
                        )}
                    </>
                    )):(<p>Start conversation</p>)
                }
                
                <div className='message-ref' ref={messageEndRef}/>
                
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