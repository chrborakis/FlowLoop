import React,{useState} from "react";
import { Col, Row, Card } from "react-bootstrap";

import Chat from './Chat';
import Friends from "./List/Friends";
import Groups from "./List/Groups";
import GroupChat from './Groups/GroupChat';

import { removeMember } from "./Groups/GroupUtils";

const FriendList = ({user}) => {
    const [chat, setChat]           = useState({sender:{}, receiver:{}})
    const [groupChat, setGroupChat] = useState({group:{}, user:{}})
    const [activeChat, setActiveChat] = useState(null); 

    const onRemoveMember = (member,setMembers,token) => removeMember(member,setMembers,setGroupChat,token)

    const handleChat = (friend) => {
        setChat({
            sender:{id: friend.id, user_id: friend.person, ...friend.person_info}, 
            receiver:{id:friend.symmetric_id, user_id: friend.friend, ...friend.friend_info}
        })
        setActiveChat('chat');
    }

    const handleGroupChat = (group) => {
        setGroupChat({
            group:{id:group.group_id, name:group.name, company: group.company, members:group.members, admins:group?.admins},
            user:{id:user.user_id, member:group?.members?.find(member => member.user_id === user.user_id)?.member || null}
        })
        setActiveChat('groupChat');
        console.log(groupChat)
    }

    return(<>
        <Card className="friends">
            <Friends user_id={user.user_id} handleChat={handleChat}/>
            { user?.work_id &&  <Groups  user={user} handleChat={handleGroupChat} onRemoveMember={onRemoveMember}/>}
        </Card>
        {activeChat === 'chat' && chat?.sender?.id &&(
            <Chat chat={chat} setChat={setChat} room={chat.sender.id+chat.receiver.id}/>
        )}
        {activeChat === 'groupChat' && groupChat?.group?.id &&(
            <GroupChat chat={groupChat} setChat={setGroupChat} room={groupChat.group.id} onRemoveMember={onRemoveMember}/>
        )}
    </>)
}

export default FriendList;