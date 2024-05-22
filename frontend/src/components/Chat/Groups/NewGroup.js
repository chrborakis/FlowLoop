import React, { useEffect, useState} from "react";
import { Modal,Form, Row, Col, Card } from "react-bootstrap"
import {TextField} from '@material-ui/core';

import Button from '@mui/material/Button';

import '../../../../static/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { newGroup } from "./GroupUtils";

const NewGroup = (props) => {   
    const [name, setName] = useState('');

    const handleChange = (event) => setName(event.target.value);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        newGroup({ name: name, company: props.user.company_id },props.user.work_id,props.setGroups,props.onHide);
    };

    return (
        <Modal {...props} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Create a Group</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <TextField className="textfield" label="Name" variant="standard" 
                        placeholder="Enter a Group Name" name="name"
                        value={name} required multiline onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant="contained" color="success" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NewGroup