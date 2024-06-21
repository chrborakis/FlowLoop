import React, { useContext, useState, useEffect} from "react";

import { useAuth } from "../../store/AuthContext";

import { User } from "../Profiles/Profile";
import {ButtonGroup, Button} from '@mui/material';
import { Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { scrollTop } from "../Extra/LinkOnTop";

import { getRequests, replyRequest, checkRequest } from "./WorkUtils"; 

const WorkRequests = ({company, refresh}) => {
    const {user, updateUser} = useAuth();
    const [requests, setRequests] = useState([]);

    const reply = (req_id, status) => {
        replyRequest(req_id, status, setRequests,  user?.id, user?.token)
    }

    useEffect(() => {
        if(refresh)getRequests( setRequests, company)
    }, [ replyRequest, refresh]);

    useEffect(() => {
        if(user) checkRequest( user, updateUser)
    },[replyRequest]);

    return(<>
        <div className="requests">
            { requests && requests.length > 0 ?(
                requests.length > 0 && requests.map( (req, idx) => 
                    <div key={req.id} className="request">
                        <Col className="align-items-center">
                            <Row>
                                <Col className="d-flex justify-content-start">
                                    <Link to={`/user/${req?.user_info?.slug}`} onClick={scrollTop}>
                                        <User user={req?.user_info}/>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <ButtonGroup orientation="horizontal" className="w-100" style={{display:'block', width:'100%'}}>
                                    <Button onClick={() => reply( req.id, 'A')} variant="contained" color="success">Accept</Button>
                                    <Button onClick={() => reply( req.id, 'D')} color="error">Decline</Button>
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

export default WorkRequests;