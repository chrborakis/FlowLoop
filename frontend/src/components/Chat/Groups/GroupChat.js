import React, {useState, useEffect, useRef} from "react";
import { Card, Row, Col } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';

import Messages from "./Messages";
import NewMessage from "../NewMessage";
import { getGroupMessages, removeMember, sendGroupMessage, updateGroupMembers } from "./GroupUtils";
import { Dropdown } from "react-bootstrap";

import '../../../../static/css/chat.css'
import '../../../../static/css/index.css'
import GroupMembers from "./GroupMembers";

const GroupChat = ({chat, setChat, room}) => {
    const [socket, setSocket] = useState(null);
    const {group, user} = chat;

    const [ messages, setMessages] = useState([]);
    const [isAdmin,setIsAdmin] = useState(false)
    const [ membersModal,setMembersModal] = useState(false);

    useEffect(()=>{
        setMessages([])
        if(chat.group){
            getGroupMessages( group.id, setMessages)
            setIsAdmin(group?.admins?.some(admin => admin.user_id === user.id))
        };
    },[chat])


    useEffect(()=>{
        if(group && user){
            console.log("Starting convo w/: ", chat)
            // clearUnread( sender.user_id, receiver.user_id)
            setSocket(new WebSocket(`ws://${window.location.host}/ws/group_chat/${group.id}/`))
        }
    },[room])

    function getMemberId(group, userId) {
        const member = group?.members?.find(member => member.user_id === userId);
        return member ? member.member : null;
    }

    // useEffect(()=>{
    //     if(members){
    //         setChat(chat => ({
    //             ...chat,
    //             user: {
    //                 ...chat.user,
    //                 member: getMemberId(group, user.id)
    //             }
    //         }));
    //         setIsAdmin(admins?.some(admin => admin.user_id === user.id));
    //         console.log("Members: ", members)
    //         console.log("Admins: ",admins)
    //     }
    // },[members])
 
    useEffect(()=>{
        if(socket){
            socket.onopen = () => console.log('WebSocket connection established: ', socket);
            socket.onmessage = function(e){
                let data = JSON.parse(e.data)     
                if(data.type ==='chat')setMessages(prevMessaged=>[...prevMessaged, data.message])
            }
            socket.onclose = () => console.log('WebSocket connection closed: ', socket);
            
            return () => socket.close()
        }
    },[socket]) 
      

    return(<>
        <Card className="chat card">
            <Card.Header className="header">
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-start">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                {group.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-center">
                                <Dropdown.Item onClick={() => setMembersModal(true)}>Members</Dropdown.Item>
                                <hr/>
                                <Dropdown.Item style={{color:"red"}}>Leave Group</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className="d-flex justify-content-end"><CloseButton onClick={()=>setChat(false)}/></Col>
                </Row>
            </Card.Header>
            <Card.Body className="message-container">
                <Messages messages={messages} user_id={user?.id}/>
            </Card.Body>
            <Card.Footer>
                <NewMessage chat={{group:group.id, sender:user.member}} setMessages={setMessages} socket={socket} onSend={sendGroupMessage}/>
            </Card.Footer>
        </Card>
        <GroupMembers group={group} show={membersModal} onHide={() => setMembersModal(false)} isAdmin={isAdmin}/>
    </>)
}

export default GroupChat;