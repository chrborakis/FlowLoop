import React, { useContext, useState, useEffect} from "react";

import { useAuth } from "../../store/AuthContext";
import { User } from "../Profiles/Profile";
import {ButtonGroup, Button} from '@mui/material';
import { Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { scrollTop } from "../Extra/LinkOnTop";

import { getRequests, replyRequest, checkRequest } from "./FriendUtils"; 
import { useNotification } from "../../store/NotificationContext";

const FriendRequests = ({ refresh}) => {
    const {user} = useAuth();
    const {addNotification} = useNotification();
    const [requests, setRequests] = useState([]);

    const reply = (receiver, info, status) => replyRequest( receiver, info, user, status, setRequests, addNotification, user?.token)

    useEffect(() => {
        if(refresh)getRequests( setRequests, user?.id)
    }, [ replyRequest, refresh]);

    return(<>
        <div className="requests">
            { requests && requests.length > 0 ?(
                requests.length > 0 && requests.map( (req, idx) => 
                    <div key={req.sender} className="request">
                        <Col className="align-items-center">
                            <Row>
                                <Col className="d-flex justify-content-start">
                                <Link to={`/user/${req?.sender_info?.slug}`} onClick={scrollTop}>
                                    <User user={req?.sender_info}/>
                                </Link>
                                </Col>
                            </Row>
                            <Row>
                                <ButtonGroup orientation="horizontal" className="w-100" style={{display:'block', width:'100%'}}>
                                    <Button onClick={() => reply( req.sender, req?.sender_info, 'A')} variant="contained" color="success">Accept</Button>
                                    <Button onClick={() => reply( req.sender, req?.sender_info, 'D')} color="error">Decline</Button>
                                </ButtonGroup>
                            </Row>
                        </Col>
                        {idx !== requests.length - 1 && <hr />}
                    </div>
                )
            ): (
                <p>No requests!</p>
            )}
        </div>
    </>)    
}

export default FriendRequests;