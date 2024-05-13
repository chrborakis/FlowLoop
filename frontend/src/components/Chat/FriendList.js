import React,{useState, useEffect} from "react";
import { getFriends } from "./Utils";
import { Col, Row, Card } from "react-bootstrap";
import { User } from "../Profiles/Profile";
import Avatar from '@mui/material/Avatar';

import Chat from './Chat';
import Friends from "./List/Friends";
import Groups from "./List/Groups";

import GroupChat from './GroupChat';

const FriendList = ({user_id}) => {
    const [chat, setChat] = useState({sender:{}, receiver:{}})
    const [groupChat, setGroupChat] = useState({group:{}, user:{}})

    const [activeChat, setActiveChat] = useState(null); 

    useEffect(()=>{
        console.group("Chats");
        console.log(chat);
        console.log(groupChat);
        console.groupEnd();
    },[chat,groupChat])

    const handleChat = (friend) => {
        setChat({
            sender:{id: friend.id, user_id: friend.person, ...friend.person_info}, 
            receiver:{id:friend.symmetric_id, user_id: friend.friend, ...friend.friend_info}
        })
        setActiveChat('chat');
    }

    const handleGroupChat = (group) => {
        console.log(group)
        setGroupChat({
            group:{id:group.group_id, name:group.name},
            user:{id:user_id}
        })
        setActiveChat('groupChat');
    }

    return(<>
        <Card className="friends">
            <Friends user_id={user_id} handleChat={handleChat}/>
            <Groups  user_id={user_id} handleChat={handleGroupChat}/>
        </Card>
        {activeChat === 'chat' && chat?.sender?.id &&(
            <Chat chat={chat} setChat={setChat} />
        )}
        {activeChat === 'groupChat' && groupChat?.group?.id &&(
            <GroupChat chat={groupChat} setChat={setGroupChat} />
        )}
    </>)
}

export default FriendList;