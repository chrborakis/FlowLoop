import React, {useState, useEffect, useRef} from "react";
import { Card, Row, Col} from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';
import { User } from "../Profiles/Profile";
import { dateFormat } from "../Extra/Date";

import NewMessage from "./NewMessage";
import { getMessages, sendMessage, clearUnread } from "./ChatUtils";

import '../../../static/css/chat.css'
import '../../../static/css/index.css'

const Chat = ({chat, setChat, room}) => {
    const [socket, setSocket] = useState(null);
    const {sender, receiver} = chat;

    const [messages, setMessages] = useState([]);
    const messageEndRef = useRef(null);

    useEffect(()=>{
        console.log("Starting convo w/: ", chat)
        if(sender && receiver){
            clearUnread( sender.user_id, receiver.user_id)
            setSocket(new WebSocket(`ws://${window.location.host}/ws/chat/${room}/`))
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
        if(chat.receiver)getMessages( sender.user_id, receiver.user_id, setMessages);
    },[chat])

    useEffect(() => scrollToBottom(), [messages]);

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
                {messages ? messages.sort((a, b) => new Date(a.send_date) - new Date(b.send_date)).map(message => (
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
                <NewMessage chat={{sender:sender.id, receiver:receiver.id}} setMessages={setMessages} socket={socket} onSend={sendMessage}/>
            </Card.Footer>
        </Card>
    </>)
}

export default Chat;