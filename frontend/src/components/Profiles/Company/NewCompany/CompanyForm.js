import React, {useEffect, useRef, useState} from "react";
import {Tabs, Tab, Button, TextField} from '@mui/material';
import { Modal } from "react-bootstrap";

import CreateCompany from "./CreateCompany";

const CompanyForm = (props) => {

    return(<>
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Start your company!
                </Modal.Title>
            </Modal.Header>
            <CreateCompany onHide={props.onHide}/>
        </Modal>       
    </>)
}

export default CompanyForm;