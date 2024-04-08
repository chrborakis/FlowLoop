import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap"
import AdminInvite from "./AdminInvite";

const DivisionInvite = ({ division, company, admin_slug,user_slug, setDivisions}) => {
    const [modalShow, setModalShow] = useState(false);

    return(<>
        {admin_slug === user_slug ? (
            <>
                <Button onClick={()=>setModalShow(true)}>Add Member</Button>
                <AdminInvite division={division} company={company} show={modalShow} onHide={() => setModalShow(false)} setDivisions={setDivisions}/>
            </>
        ) : (
            <p>Request Assignment...</p>
        )}
    </>);
    
}

export default DivisionInvite


