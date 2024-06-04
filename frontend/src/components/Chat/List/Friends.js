import React, {useState, useEffect, useRef} from "react";
import { getFriends } from "../ChatUtils";
import { Avatar } from "@material-ui/core";
import { Card, Row,Col } from "react-bootstrap";
import {Form} from 'react-bootstrap';
import { TextField } from "@material-ui/core";
import { UserAvt } from "../../Profiles/Profile";

const Friends = ({user_id, handleChat}) => {
    const [friends, setFriends] = useState([]);
    const [filteredList, setFilteredList] = useState(friends);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(()=>{
        if(user_id) getFriends(user_id, setFriends);
    },[user_id])

    useEffect(()=>{
        if(friends)setFilteredList(friends)
    },[friends])

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const filtered = friends.filter(friend => friend.friend_info.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredList(filtered);
    };
    
    const toggleEditMode = () => setIsEditing(!isEditing);

    return(<>
        <Card.Header onClick={toggleEditMode} style={{ cursor: 'pointer' }}>
            {isEditing ? (
              <Form>
                <TextField className="textfield" value={inputValue} onChange={handleChange}
                    placeholder="Search" name="friend"multiline fullWidth autoFocus onBlur={() => setIsEditing(false)}/>
              </Form>
            ) : (
              <>Friends ({friends?.length || 0})</>
            )}
        </Card.Header>
        <Card.Body style={{ overflowY: 'auto', width: '100%', scrollbarWidth: 'thin' }}>
            {friends ? (
                <Col className="active-list">
                    {filteredList.map(friend => (
                        <div className="active-friend" key={friend.id} alt={friend.friend_info.name} onClick={() => handleChat(friend)}>
                            <div className="avatar-wrapper">
                                {/* <Avatar alt={friend.friend_info.name} title={friend.friend_info.name} src={`/files/${friend.friend_info.image}`} width={60}/> */}
                                <UserAvt user={{name:friend.friend_info.name, image:friend.friend_info.image}} width={60} circle/>
                                <div className="name-wrapper">
                                    <p className='name'>{friend.friend_info.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Col>
            ) : (
                <p>No friends yet</p>
            )}
        </Card.Body>
    </>)
}

export default Friends;