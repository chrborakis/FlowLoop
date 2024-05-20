import React,{useState} from "react";
import { Col, Row, Card } from "react-bootstrap";

import Chat from './Chat';
import Friends from "./List/Friends";
import Groups from "./List/Groups";
import GroupChat from './Groups/GroupChat';

const FriendList = ({user_id}) => {
    const [chat, setChat]           = useState({sender:{}, receiver:{}})
    const [groupChat, setGroupChat] = useState({group:{}, user:{}})
    const [activeChat, setActiveChat] = useState(null); 

    const handleChat = (friend) => {
        setChat({
            sender:{id: friend.id, user_id: friend.person, ...friend.person_info}, 
            receiver:{id:friend.symmetric_id, user_id: friend.friend, ...friend.friend_info}
        })
        setActiveChat('chat');
    }

    const handleGroupChat = (group) => {
        setGroupChat({
            group:{id:group.group_id, name:group.name, company: group.company, members:group.members, admins:group.admins},
            user:{id:user_id, member:group?.members?.find(member => member.user_id === user_id)?.member || null}
        })
        setActiveChat('groupChat');
    }

    return(<>
        <Card className="friends">
            <Friends user_id={user_id} handleChat={handleChat}/>
            <Groups  user_id={user_id} handleChat={handleGroupChat}/>
        </Card>
        {activeChat === 'chat' && chat?.sender?.id &&(
            <Chat chat={chat} setChat={setChat} room={chat.sender.id+chat.receiver.id}/>
        )}
        {activeChat === 'groupChat' && groupChat?.group?.id &&(
            <GroupChat chat={groupChat} setChat={setGroupChat} room={groupChat.group.id}/>
        )}
    </>)
}

export default FriendList;