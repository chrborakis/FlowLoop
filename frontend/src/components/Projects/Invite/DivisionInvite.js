import React, {useEffect, useState} from "react";
import AdminInvite from "./AdminInvite";
import Requests from "./Requests";
import {Row,Col} from "react-bootstrap"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const DivisionInvite = ({ division, company, admin_slug, user_slug, setDivisions}) => {
    const [modalShow, setModalShow] = useState(false);
    const [requestsShow, setRequestsShow] = useState(false);

    return(<>
        {/* Admin Option */}
        {admin_slug === user_slug ? (
            <>
                <ButtonGroup aria-label="Basic button group">
                    <Button variant="contained" color="primary" onClick={() => setModalShow(true)}>Add Member</Button>
                    <AdminInvite division={division} company={company} show={modalShow} onHide={() => setModalShow(false)} setDivisions={setDivisions} />
                    {division.requests.length > 0 && (<div>
                        <Button variant="secondary" onClick={() => setRequestsShow(true)}>Requests</Button>
                        <Requests  division={division} setDivisions={setDivisions} show={requestsShow} onHide={() => setRequestsShow(false)}/>
                    </div>
                    )}
                </ButtonGroup>
            </>
        ) : (
            <Button variant="outline-primary" onClick={()=>setModalShow(true)}>Request Assignment</Button>
        )}
        {/* User Option */}
    </>);
    
}

export default DivisionInvite


