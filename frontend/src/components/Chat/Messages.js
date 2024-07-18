import React, {useState, useEffect, useRef} from "react";
import { Row, Col, Card } from "react-bootstrap";
import { User } from "../Profiles/Profile";
import { scrollTop } from "../Extra/LinkOnTop";
import { Link } from "react-router-dom";
import { dateFormat } from "../Extra/Date";
import Chat from "./Chat";

import '../../../static/css/messages.css'

import { UserAvt } from "../Profiles/Profile";

const Messages = ({ user, refresh, messages, chats, handleChat }) => {

    const setChat = (chat) => {
        
        const receiver   = user === chat.sender_info.id ? chat.receiver : chat.sender;
        const sender = user !== chat.sender_info.id ? chat.receiver : chat.sender;

        const receiver_info   = user === chat.sender_info.id ? chat.receiver_info : chat.sender_info;
        const sender_info = user !== chat.sender_info.id ? chat.receiver_info : chat.sender_info

        handleChat({sender,sender_info, receiver,receiver_info})
    }

    return (
        <div className="chats-list">
            {chats && chats.length > 0 ? (
                chats.map((chat, idx) => (
                    <>
                    
                    <div key={chat.message_id} onClick={() => setChat(chat)}
                        className={`chat ${!chat.read && user === chat.receiver_info.id ? "unread" : ""}`}
                    >
                        <Col xs={10}>
                            <Row className="message_notif">
                                <Col xs={2}>
                                    <UserAvt user={{name:user === chat.sender_info.id ? chat.receiver_info.name : chat.sender_info.name, 
                                        image:user === chat.sender_info.id ? `/files/${chat.receiver_info.image}` : `/files/${chat.sender_info.image}`}} width={40} circle/>
                                    {/* <img src={ user === chat.sender_info.id ? `/files/${chat.receiver_info.image}` : `/files/${chat.sender_info.image}`} style={{width: "40px",height: "40px",borderRadius: "50%",}} /> */}
                                </Col>
                                <Col xs={10} className="d-flex justify-content-between align-items-start">
                                    <Link to={ user === chat.sender_info.id  ? `/user/${chat.receiver_info.slug}`  : `/user/${chat.sender_info.slug}`} onClick={scrollTop}>
                                        {user === chat.sender_info.id ? chat.receiver_info.name : chat.sender_info.name}
                                    </Link>
                                    <span className="ml-auto">
                                        {dateFormat(chat.send_date)}
                                    </span>
                                </Col>
                                <Col className="chat-text" xs={12}>
                                    {user === chat.sender_info.id && <b>You: </b>}
                                    {chat.message}
                                </Col>
                            </Row>
                        </Col>
                    </div>
                        {idx !== chats.length - 1 && <hr />}
                        </>
                ))
            ) : (
                <p>No Chats found!</p>
            )}
        </div>
    );
};

export default Messages;