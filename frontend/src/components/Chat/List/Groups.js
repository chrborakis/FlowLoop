import React, {useState, useEffect, useRef} from "react";
import { getGroups } from "../Groups/GroupUtils";
import { Avatar } from "@material-ui/core";
import { Card, Row,Col } from "react-bootstrap";
import {Form} from 'react-bootstrap';
import { TextField } from "@material-ui/core";

const Groups = ({user_id, handleChat}) => {
    const [groups, setGroups] = useState([]);
    const [filteredList, setFilteredList] = useState(groups);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(()=>{
        if(user_id) getGroups(user_id, setGroups);
    },[user_id])

    useEffect(()=>{
        if(groups)setFilteredList(groups)
    },[groups])

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const filtered = groups.filter(group => group.name.toLowerCase().includes(value.toLowerCase()));
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
              <>Groups ({groups?.length || 0})</>
            )}
        </Card.Header>
        <Card.Body style={{ overflowY: 'auto', width: '100%', scrollbarWidth: 'thin' }}>
            {groups ? (
                <Col className="active-list">                        
                    {filteredList.map( group => 
                        <div className="active-friend" key={group.group_id} alt={group.name} onClick={() => handleChat(group)}>
                            <div className="avatar-wrapper">
                                <Avatar alt={group.name} title={group.name} src={`/files/${group?.image}` || ''} width={60}/>
                                <div className="name-wrapper">
                                    <p className='name'>{group.name}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Col>
            ) : (
                <p>No groups yet</p>
            )}
        </Card.Body>
    </>)
}

export default Groups;