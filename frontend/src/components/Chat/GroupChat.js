import React, {useState, useEffect, useRef} from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';
import { User } from "../Profiles/Profile";
import { getGroupMessages, sendGroupMessage, clearUnread } from "./Utils";
import { TextField } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { dateFormat } from "../Extra/Date";
import Avatar from "@material-ui/core";

import '../../../static/css/chat.css'
import '../../../static/css/index.css'

const GroupChat = ({chat, setChat, room}) => {
    const [socket, setSocket] = useState(null);
    const {group, user} = chat;

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const messageEndRef = useRef(null);

    useEffect(()=>{
        console.log("Starting convo w/: ", chat)
        if(group && user){
            // clearUnread( sender.user_id, receiver.user_id)
            setSocket(new WebSocket(`ws://${window.location.host}/ws/group_chat/${group.id}/`))
        }
    },[room])
 
    useEffect(()=>{
        if(socket){
            socket.onopen = () => console.log('WebSocket connection established: ', socket);
            socket.onmessage = function(e){
                let data = JSON.parse(e.data)     
                if(data.type ==='chat')setMessages(prevMessaged=>[...prevMessaged, data.message])
            }
            socket.onclose = () => console.log('WebSocket connection closed: ', socket);
            
            return () => socket.close()
        }
    },[socket])
    
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const handleMouseEnter = (messageId) => setHoveredMessageId(messageId);
    const handleMouseLeave = () => setHoveredMessageId(null);

    useEffect(()=>{
        setMessages([])
        if(chat.group)getGroupMessages( group.id, setMessages);
    },[chat])

    useEffect(() => {scrollToBottom();}, [messages]);

    const handleChange = (event) => setMessage(event.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Message: ', message)
        sendGroupMessage({group:group.id, sender:user.member, message:message}, setMessages, setMessage, socket)
    }

    const scrollToBottom = () => messageEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return(<>
        <Card className="chat card">
            <Card.Header className="header">
                <Row>
                    <Col>{group.name}</Col>
                    <Col className="d-flex justify-content-end"><CloseButton onClick={()=>setChat(false)}/></Col>
                </Row>
            </Card.Header>
            <Card.Body className="message-container">
                {messages ? messages.sort((a, b) => new Date(a.send_date) - new Date(b.send_date)).map(message => (
                    <>
                        {message.sender_info.id !== user.id && (
                            <img src={`/files/${message.sender_info?.image}`} width={45}/>
                        )}
                        <div key={message.id} className={`message ${message.sender_info.id === user.id ? 'sender' : 'receiver'}`}
                            onMouseEnter={() => handleMouseEnter(message.id)} onMouseLeave={handleMouseLeave}>
                            {message.message}
                        </div>
                        {hoveredMessageId === message.id && (
                            <span className={`message-date ${message.sender_info.id === user.id ? 'sender-date' : 'receiver-date'}`}>
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

export default GroupChat;