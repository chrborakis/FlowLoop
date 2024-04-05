import React, { useContext, useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../../store/AuthContext";
import { getRequests, replyRequest, checkRequest } from "./FriendUtils"; 

import { Link } from "react-router-dom";
import {scrollTop} from '../Extra/LinkOnTop';

const FriendRequests = ({ refresh}) => {
    const {user} = useAuth();
    const [requests, setRequests] = useState([]);

    const reply = (req_id, status) => {
        console.log("REQ_ID", req_id)
        replyRequest( user?.id, req_id, status, setRequests)
        window.location.reload();
        console.log(requests)
    }

    useEffect(() => {
        getRequests( setRequests, user?.id)
    }, [ replyRequest, refresh]);

    return(<>
        <div className="requests">
            <h4>Friend Requests</h4>
            { requests && requests.length > 0 ?(
                requests.length > 0 && requests.map( (req, idx) => 
                    <div key={req.user1} className="request">
                        {console.log(req.user1_info)}
                        <div className="left">
                            <Link to={`/user/${req?.user1_info?.slug}`} onClick={scrollTop}>
                                <img src={`/files/${req.user1_info.image}`} width={50}/>
                                {req.user1_info.name}
                            </Link>
                        </div>
                        <div className="right">
                            <Button onClick={() => reply( req.user1, 'A')} variant="outline-primary">Accept</Button>
                            <Button onClick={() => reply( req.user1, 'D')} variant="outline-danger">Decline</Button>
                        </div>
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