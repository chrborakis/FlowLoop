import React, {useEffect, useState} from "react";
import {Modal, Form,Dropdown } from "react-bootstrap"
import Button from '@material-ui/core/Button';
import { replyRequest } from "../Divisions/DivisionUtils";
const Requests = (props) => {
    const [selectedOption, setSelectedOption] = useState({id:'',work_on:'',name:''});

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(selectedOption.work_on){
            const data = {"division": props.division.division,"employee": selectedOption.work_on, "status": "A"}
            replyRequest( selectedOption.id, data, props.division.division, props.setDivisions, props.onHide)
        }
    }

    return(<>
        <Modal {...props} size="lg" centered
            aria-labelledby="contained-modal-title-vcenter"   
        >
            <Form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Assign Requests
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        {selectedOption.name || 'Select an employee'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {props.division?.requests && props.division?.requests.map((request, index) => (
                        <Dropdown.Item key={index} eventKey={request} onClick={() => setSelectedOption({id:request.id, work_on:request.work_id,name:request.name})}>
                            <>
                                <img src={`/files/${request.image}`} width={50}/>
                                {request.name}
                            </>
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" type="submit">Assign</Button>
            </Modal.Footer>
            </Form>
        </Modal>       
    </>)
}

export default Requests