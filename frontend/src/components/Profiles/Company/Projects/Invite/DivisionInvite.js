import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap"
import AdminInvite from "./AdminInvite";

const DivisionInvite = ({ division, company, admin_slug,user_slug, setDivisions}) => {
    const [modalShow, setModalShow] = useState(false);

    return(<>
        {/* Admin Option */}
        {admin_slug === user_slug ? (
            <>
                <Button variant="primary" onClick={()=>setModalShow(true)}>Add Member</Button>
                <AdminInvite division={division} company={company} show={modalShow} onHide={() => setModalShow(false)} setDivisions={setDivisions}/>
            </>
        ) : (
            <Button variant="outline-primary" onClick={()=>setModalShow(true)}>Request Assignment</Button>
        )}
        {/* User Option */}
    </>);
    
}

export default DivisionInvite


