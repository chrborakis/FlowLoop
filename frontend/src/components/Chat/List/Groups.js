import React, {useState, useEffect, useRef} from "react";
import { getGroups } from "../Utils";
import { Avatar } from "@material-ui/core";
import { Card, Row,Col } from "react-bootstrap";

const Groups = ({user_id, handleChat}) => {
    const [groups, setGroups] = useState([]);

    useEffect(()=>{
        if(user_id) getGroups(user_id, setGroups);
    },[user_id])

    return(<>
        <Card.Header>
            Groups ({groups?.length || 0 })
        </Card.Header>
        <Card.Body style={{ overflowY: 'auto', width: '100%', scrollbarWidth: 'thin' }}>
            {groups ? (
                <Col className="active-list">                        
                    {groups.map( group => 
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