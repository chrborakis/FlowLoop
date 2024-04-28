import React,{useState, useEffect} from "react";
import { getFriends } from "./Utils";
import { Col, Row, Card } from "react-bootstrap";
import { User } from "../Profiles/Profile";
import Avatar from '@mui/material/Avatar';

const FriendList = ({user_id}) => {
    const [friends, setFriends] = useState([])

    useEffect(()=>{
        if(user_id) getFriends(user_id, setFriends);
    },[user_id])

    const openChat = (friend) => {
        console.log("Starting convo w/: ", friend)
    }

    return(
        <Card className="friends">
        <Card.Header >
            <p>Active Friends</p>
        </Card.Header>
        <Card.Body>
            {friends ? (
                <Col className="active-list">
                    {friends.map( friend => 
                        <div className="active-friend" onClick={() => openChat({friend:friend.friend, friend_info:friend.friend_info})}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <Avatar alt={friend.friend_info.name} src={`/files/${friend.friend_info.image}`} width={60}/>
                                <p className='name'>{friend.friend_info.name}</p>
                            </div>
                        </div>
                    )}
                </Col>
            ) : (
                <p>No friends online yet</p>
            )}
        </Card.Body>
            </Card>
    )
}

export default FriendList;