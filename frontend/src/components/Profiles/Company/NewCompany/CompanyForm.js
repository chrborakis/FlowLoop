import React, {useEffect, useRef, useState} from "react";
import {Tabs, Tab, Button, TextField} from '@mui/material';
import { Modal } from "react-bootstrap";
import TabPanel from "../../../Extra/TabPanel";

import CreateAddress from "./CreateAddress";
import CreateCompany from "./CreateCompany";

const CompanyForm = (props) => {
    const [form, setForm] = useState(0);
    const handleChange = (event, newForm) => setForm(newForm);

    return(<>
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Start your company!
                </Modal.Title>
            </Modal.Header>
                <Tabs value={form} onChange={handleChange} indicatorColor="primary"  variant="fullWidth" style={{ justifyContent: 'center' }} textColor="primary" centered>
                    <Tab label="Company" disabled />
                    <Tab label="Address" disabled />
                </Tabs>
            <Modal.Body>
                <TabPanel value={form} index={0}>
                    <CreateCompany setForm={setForm} onHide={props.onHide}/>
                </TabPanel>
                <TabPanel value={form} index={1}>
                    <CreateAddress onHide={props.onHide}/>
                </TabPanel>
            </Modal.Body>
        </Modal>       
    </>)
}

export default CompanyForm;