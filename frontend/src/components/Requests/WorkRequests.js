import React, { useContext, useState, useEffect} from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useAuth } from "../../store/AuthContext";
import { getRequests, replyRequest,checkRequest } from "./WorkUtils"; 

import { useReq } from "../../store/RequestContext";

const WorkRequests = ({company, refresh}) => {
    // const { requests_ctx } = useReq();   

    const {user, updateUser} = useAuth();
    const [requests, setRequests] = useState([]);

    const reply = (req_id, status) => {
        replyRequest(req_id, status, setRequests)
        console.log(requests)
    }

    useEffect(() => {getRequests( setRequests, company)}, [ replyRequest, refresh]);
    useEffect(() => {checkRequest( user, updateUser)},[replyRequest]);

    return(<>
        <div className="requests">
            <h4>Work Requests</h4>
            { requests && requests.length > 0 ?(
                requests.length > 0 && requests.map( (req, idx) => 
                    <div key={req.id} className="request">
                        <div className="left">
                            <img src={req.user_info.image ? req.user_info.image : "/files/user_image/dummy-user.png"} width={50}/>
                            {req.user_info.name}
                        </div>
                        <div className="right">
                            <Button onClick={() => reply( req.id, 'A')} variant="outline-primary">Accept</Button>
                            <Button onClick={() => reply( req.id, 'D')} variant="outline-danger">Decline</Button>
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

export default WorkRequests;