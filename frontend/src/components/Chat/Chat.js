import React, {useState, useEffect} from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';
import { User } from "../Profiles/Profile";
import { getMessages } from "./Utils";

import '../../../static/css/chat.css'
import '../../../static/css/index.css'

const Chat = ({chat, setChat}) => {
    const {user, friend} = chat;
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        setMessages([])
        if(chat.friend){
            getMessages( user, friend.friend, setMessages);
        }
    },[chat])
    
    return(<>
        <Card className="chat card">
            <Card.Header className="header">
                <Row>
                    <Col><User user={friend.friend_info} circle width={75}/></Col>
                    <Col className="d-flex justify-content-end"><CloseButton onClick={()=>setChat(false)}/></Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {messages && messages.map(message => (
                    <div key={message.message_id} className={`message ${message.sender_info.id === user ? 'sender' : 'receiver'}`}>
                        {message.message}
                    </div>
                ))}
            </Card.Body>
            <Card.Footer>
                <Form>
                    <p>Send message...</p>
                </Form>
            </Card.Footer>
        </Card>
    </>)
}

export default Chat;