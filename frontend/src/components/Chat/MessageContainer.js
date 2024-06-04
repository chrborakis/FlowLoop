import React, { useState, useEffect } from "react";
import { getChats } from "./ChatUtils";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { User } from "../Profiles/Profile";
import { scrollTop } from "../Extra/LinkOnTop";
import { Link } from "react-router-dom";
import { dateFormat } from "../Extra/Date";
import Chat from "./Chat";
import Messages from "./Messages";
import "../../../static/css/messages.css";

const MessageContainer = ({ user, refresh, messages }) => {
    // Recent chats
    const [chats, setChats] = useState([]);
    // Chat info about sender-receiver(ids)
    const [chat, setChat] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false); // Track whether the chat is open or closed
    useEffect(() => {
        if (refresh) {
            setChats([]);
            getChats( user, setChats);
            messages.updateUnread(user.id, messages.setMessages);
        }
    }, [refresh]);

    const handleChat = (_chat) => {
        if (user === _chat.sender_info.id) {
            setChat({
                sender: {
                    id: _chat.sender,
                    user_id: _chat.sender_info.id,
                    name: _chat.sender_info.name,
                    slug: _chat.sender_info.slug,
                    image: _chat.sender_info.image,
                },
                receiver: {
                    id: _chat.receiver,
                    user_id: _chat.receiver_info.id,
                    name: _chat.receiver_info.name,
                    slug: _chat.receiver_info.slug,
                    image: _chat.receiver_info.image,
                },
            });
        } else {
            setChat({
                sender: {
                    id: _chat.receiver,
                    user_id: _chat.receiver_info.id,
                    name: _chat.receiver_info.name,
                    slug: _chat.receiver_info.slug,
                    image: _chat.receiver_info.image,
                },
                receiver: {
                    id: _chat.sender,
                    user_id: _chat.sender_info.id,
                    name: _chat.sender_info.name,
                    slug: _chat.sender_info.slug,
                    image: _chat.sender_info.image,
                },
            });
        }
        setIsChatOpen(true);
    };

    return (<>
        <Messages user={user.id} refresh={refresh} handleChat={handleChat}
            messages={messages} chats={chats} setChat={setChat}
        />
        { isChatOpen && chat && <Chat chat={chat} setChat={setChat} />}
    </>);
};



export default MessageContainer;