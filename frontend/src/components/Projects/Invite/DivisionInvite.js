import React, {useEffect, useState} from "react";
import AdminInvite from "./AdminInvite";
import Requests from "./Requests";
import {Row,Col} from "react-bootstrap"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { requestAssign } from "../Divisions/DivisionUtils";

const DivisionInvite = ({ division, company, admin, user, setDivisions, addNotification}) => {
    const [modalShow, setModalShow] = useState(false);
    const [requestsShow, setRequestsShow] = useState(false);

    const [requested,setRequested] = useState(division?.requests?.every((request) => request.slug === user.slug))

    const sendRequest = () => requestAssign({division:division.division, employee:user.work_id}, setRequested, user?.token)

    return(<>
        {/* Admin Option */}
        {admin?.id === user?.id ? (
            <>
                <ButtonGroup aria-label="Basic button group">
                    <Button variant="contained" color="primary" onClick={() => setModalShow(true)}>Add Member</Button>
                    <AdminInvite admin_id={user?.id} division={division} company={company} show={modalShow} onHide={() => setModalShow(false)} setDivisions={setDivisions} token={user?.token} addNotification={addNotification}/>
                    {division.requests?.length > 0 && (<div>
                        <Button variant="secondary" onClick={() => setRequestsShow(true)}>Requests</Button>
                        <Requests admin_id={user?.id} company={company} division={division} setDivisions={setDivisions} show={requestsShow} onHide={() => setRequestsShow(false)} token={user?.token}/>
                    </div>
                    )}
                </ButtonGroup>
            </>
        ) : (
            <Button variant="outline-primary" disabled={requested} onClick={sendRequest}>
                {requested ? "Pending Reply" : "Request Assignment"}
            </Button>
        )}
        {/* User Option */}
    </>);
}

export default DivisionInvite