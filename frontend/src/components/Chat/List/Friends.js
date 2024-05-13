import React, {useState, useEffect, useRef} from "react";
import { getFriends } from "../Utils";
import { Avatar } from "@material-ui/core";
import { Card, Row,Col } from "react-bootstrap";

const Friends = ({user_id, handleChat}) => {
    const [friends, setFriends] = useState([]);

    useEffect(()=>{
        if(user_id) getFriends(user_id, setFriends);
    },[user_id])

    return(<>
        <Card.Header >
            Friends ({friends?.length || 0 })
        </Card.Header>
        <Card.Body style={{ overflowY: 'auto', width: '100%', scrollbarWidth: 'thin' }}>
            {friends ? (
                <Col className="active-list">                        
                    {friends.map( friend => 
                        <div className="active-friend" key={friend.id} alt={friend.friend_info.name} onClick={() => handleChat(friend)}>
                            <div className="avatar-wrapper">
                                <Avatar alt={friend.friend_info.name} title={friend.friend_info.name} src={`/files/${friend.friend_info.image}`} width={60}/>
                                <div className="name-wrapper">
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
    </>)
}

export default Friends;