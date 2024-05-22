import React, {useState, useEffect, useRef} from "react";
import { getGroups } from "../Groups/GroupUtils";
import { Avatar } from "@material-ui/core";
import { Card, Row,Col } from "react-bootstrap";
import {Form} from 'react-bootstrap';
import { TextField } from "@material-ui/core";

import { Button } from "@material-ui/core";

import { UserAvt } from "../../Profiles/Profile";

import "../../../../static/css/groups.css"
import NewGroup from "../Groups/NewGroup";

const Groups = ({user, handleChat, onRemoveMember}) => {
    const [groups, setGroups] = useState([]);
    const [filteredList, setFilteredList] = useState(groups);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(()=>{
        if(user.user_id) getGroups(user.user_id, setGroups);
    },[user, onRemoveMember])

    useEffect(()=>{
        if(groups)setFilteredList(groups)
        console.log(groups)
    },[groups])

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const filtered = groups.filter(group => group.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredList(filtered);
    };
    
    const toggleEditMode = () => setIsEditing(!isEditing);

    const [newGroupModal, setNewGroupModal] = useState(false);

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
        <Card.Body className="card-body-flex">
            {groups ? (
                <Col className="active-list">                        
                    {filteredList.map( group => 
                        <div className="active-friend" key={group.group_id} alt={group.name} onClick={() => handleChat(group)}>
                            <div className="avatar-wrapper">
                                {/* <Avatar alt={group.name} title={group.name} src={`/files/${group?.image}` || ''} width={60}/> */}
                                <UserAvt user={{name:group.name}} width={60}/>
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
            <div className="create_group">
                <Button variant="contained" color="primary" onClick={() => setNewGroupModal(true)}>New Group</Button>
                <NewGroup user={user} setGroups={setGroups} show={newGroupModal} onHide={() => setNewGroupModal(false)}/>  
            </div>
        </Card.Body>
    </>)
}

export default Groups;