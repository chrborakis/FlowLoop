import React, {useEffect, useState} from "react";
import {Modal,Button, Form,Dropdown } from "react-bootstrap"
import { fetchStaff, addAssign } from "../ProjectUtils";

const AdminInvite = (props) => {
    const [workers, setWorkers] = useState([])
    const [selectedOption, setSelectedOption] = useState({work_on:'',name:''});

    useEffect( ()=>{ fetchStaff(props.company, setWorkers)},[])

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log( props.division, selectedOption)
        addAssign(props.division, selectedOption.work_on, props.setDivisions, props.onHide)
    }

    return(<>
        <Modal {...props} size="lg" centered
            aria-labelledby="contained-modal-title-vcenter"   
        >
            <Form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Assign Division
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="success">
                        {selectedOption.name || 'Select an employee'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {workers && workers.map((worker, index) => (
                        <Dropdown.Item key={index} eventKey={worker} onClick={() => setSelectedOption({work_on:worker.id,name:worker.employee.name})}>
                            <>
                                <img src={`/files/${worker.employee.image}`} width={50}/>
                                {worker.employee.name}
                            </>
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">Assign</Button>
            </Modal.Footer>
            </Form>
        </Modal>       
    </>)
}

export default AdminInvite