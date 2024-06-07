import React, {useEffect, useState} from "react";
import {Modal, Form,Dropdown } from "react-bootstrap"
import { fetchStaff } from "../Projects/ProjectUtils";
import { addAssign } from "../Divisions/DivisionUtils";
import Button from '@material-ui/core/Button';

const AdminInvite = (props) => {
    const [workers, setWorkers] = useState([])
    const [selectedOption, setSelectedOption] = useState({user_id:'',work_on:'',name:''});

    useEffect( ()=>{ fetchStaff(props.company.id, setWorkers)},[])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(selectedOption.work_on){
            addAssign(props.division, selectedOption.work_on, props.setDivisions, props.onHide, props.token,
                props.company.slug, props.admin_id, selectedOption.user_id
            )
        }
    }

    return(<>
        <Modal {...props} size="lg" centered aria-labelledby="contained-modal-title-vcenter">
            <Form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="admin-inv-vcenter">
                        Assign Division
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        {selectedOption.name || 'Select an employee'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {workers && workers.map((worker, index) => (
                        <Dropdown.Item key={index} eventKey={worker} onClick={() => setSelectedOption({user_id:worker.employee.id, work_on:worker.id,name:worker.employee.name})}>
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
                <Button variant="contained" color="primary" type="submit">Assign</Button>
            </Modal.Footer>
            </Form>
        </Modal>       
    </>)
}

export default AdminInvite