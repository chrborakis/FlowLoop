import React, {useState, useEffect} from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const WorkRequests = ({company}) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getRequests = async(e) => {
            await axios.get(`/backend/workrequests/${company}`)
            .then( res => setRequests(res.data.data))
            .catch(err => console.log(err))
        }
        getRequests()
    }, []);

    return(<>
            <div className="requests">
            <h4>Work Requests</h4>
            { requests && requests.length > 0 ?(
                requests.length > 0 && requests.map( (req, idx) => 
                    <div key={req.id} className="request">
                        <div className="left">
                            <img src={req.user_info.image ? req.user_info.image : "/files/user_image/dummy-user.png"} width={50}/>
                            {req.user.user_name}
                        </div>
                        <div className="right">
                            <Button variant="outline-primary">Accept</Button>{' '}
                            <Button variant="outline-danger">Decline</Button>{' '}
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