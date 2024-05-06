import React,{useState, useEffect} from "react";
import { getFriends } from "./Utils";
import { Col, Row, Card } from "react-bootstrap";
import { User } from "../Profiles/Profile";
import Avatar from '@mui/material/Avatar';

import Chat from './Chat';

const FriendList = ({user_id}) => {
    const [friends, setFriends] = useState([])
    const [chat, setChat] = useState({sender:{}, receiver:{}})

    useEffect(()=>{
        if(user_id) getFriends(user_id, setFriends);
    },[user_id])

    const handleChat = (friend) => {
        console.log("Starting convo w/: ", friend)
        setChat({
            sender:{id: friend.id, user_id: friend.person, ...friend.person_info}, 
            receiver:{id:friend.symmetric_id, user_id: friend.friend, ...friend.friend_info}
        })
    }

    return(<>
        <Card className="friends">
            <Card.Header >
                <p>Active Friends</p>
            </Card.Header>
            <Card.Body>
                {friends ? (
                    <Col className="active-list">
                        {friends.map( friend => 
                            <div className="active-friend" alt={friend.friend_info.name} onClick={() => handleChat(friend)}>
                                <div className="avatar-wrapper">
                                    <Avatar alt={friend.friend_info.name} title={friend.friend_info.name} src={`/files/${friend.friend_info.image}`} width={60}/>
                                    <div class="name-wrapper">
                                        <p className='name'>{friend.friend_info.name}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Col>
                ) : (
                    <p>No friends online yet</p>
                )}
            </Card.Body>
        </Card>
        {console.log('CHAT:',chat)}
        { chat.receiver.id ? <Chat chat={chat} setChat={setChat}/> : (
            () => {setChat(false)}
        ) }
    </>)
}

export default FriendList;