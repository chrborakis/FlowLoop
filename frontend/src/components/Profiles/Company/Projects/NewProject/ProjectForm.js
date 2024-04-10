import React, {useEffect, useState} from "react";
import {Modal,Button, Form,Dropdown,Row,Col } from "react-bootstrap"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Range from '../Range'
import { GoArrowRight } from "react-icons/go";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../../../../store/AuthContext';
import { addProject } from "../ProjectUtils";


const ProjectForm = ({ company, onSubmit, projectError, setProjectError, setNewProject, setNextForm, setProject}) => {
    const { user} = useAuth();
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
    const [formData, setFormData] = useState({ 
        title: '',  description: ''
    });

    const [startDate, setStartDate] = useState();
    const handleStartDateChange = (date) => setStartDate(new Date(date));

    const [finishDate, setFinishDate] = useState();
    const handleFinishDateChange = (date) => setFinishDate(new Date(date));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };


    // const dateFormat = new Intl.DateTimeFormat(undefined, {
    //     month: 'short',
    //     day: 'numeric',
    //   });

    const handleSubmit = async(e) => {
        e.preventDefault()
        setProjectError(null);
        const start_date  = new Date(startDate).toISOString().split('T')[0];
        const finish_date = new Date(finishDate).toISOString().split('T')[0];
        if(startDate < finishDate){
            const data = { ...formData, company:company, phase:"I", start_date, finish_date}
            console.log(data)

            addProject( data, onSubmit, setNewProject, user.work_id, setProjectError, setProject)
        }else{
            setProjectError("Start date must be before finish date...")
        }
    }

    return(<>
            <Form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="project_title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" 
                            placeholder="Insert a title..." 
                            value={formData.title} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                    
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="project_description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" type="text" as="textarea" rows={5} 
                            placeholder="Insert a description..." 
                            value={formData.description} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                </Row>
                    {/* <Form.Group as={Col} className="mb-3" controlId="description">
                        <Form.Label>Date</Form.Label>
                        <Range></Range>
                    </Form.Group> */}
                
                    <Form.Group as={Col} className="mb-3" controlId="Started">
                    <Form.Label>Start Date</Form.Label>
                        <DatePicker  required
                            selected={startDate} onChange={handleStartDateChange}
                            dateFormat="yyyy-MM-dd" minDate={today} isClearable ={true}
                            showYearDropdown={true} scrollableYearDropdown={true}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="Started">
                    <Form.Label>Finish Date</Form.Label>
                        <DatePicker  required
                            selected={finishDate} onChange={handleFinishDateChange}
                            dateFormat="yyyy-MM-dd" minDate={today} isClearable ={true}
                            showYearDropdown={true} scrollableYearDropdown={true}
                        />
                    </Form.Group>
                    {projectError && <span className="text-danger">{projectError}</span>}
                </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" type="submit" onClick={()=>setNextForm(false)}>
                Create
            </Button>
            {/* <Button variant="primary" type="submit" onClick={()=>setNextForm(true)}>
                Continue <GoArrowRight />
            </Button> */}
        </Modal.Footer>
        </Form>
    </>)
}

export default ProjectForm;