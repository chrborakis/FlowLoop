import React, { useContext, useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../../store/AuthContext";
import { getRequests, replyRequest,checkRequest } from "./WorkUtils"; 

import { User } from "../Profiles/Profile";
import { Link } from "react-router-dom";
import { scrollTop } from "../Extra/LinkOnTop";

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
                            {console.log(req.user_info)}
                            <Link to={`/user/${req?.user_info?.slug}`} onClick={scrollTop}>
                                <img src={`/files/${req.user_info.image}`} width={50}/>
                                {req.user_info.name}
                            </Link>
                            {/* <User user={req?.user1_info}/> */}
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