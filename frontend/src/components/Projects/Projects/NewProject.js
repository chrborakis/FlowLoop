import React, { useState} from "react";
import {Modal, Form,Dropdown,Row,Col } from "react-bootstrap"
import Button from '@mui/material/Button';

import { addProject } from "./ProjectUtils";
import {TextField} from '@material-ui/core';
import { useAuth } from "../../../store/AuthContext"; 
import DateRange from "../../Extra/DateRange";

import '../../../../static/css/index.css'

const NewProject = (props) => {
    const { user} = useAuth();
    
    const [project, setProject] = useState(null)
    const [projectError, setProjectError] = useState()
    
    const [formData, setFormData] = useState({ title: '',  description: ''});

    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };    

    const handleSubmit = async(e) => {
        e.preventDefault()
        setProjectError(null);

        const { startDate, endDate } = dateRange[0];
        const start_date1  = new Date(startDate).toISOString().split('T')[0];
        const finish_date1 = new Date(endDate).toISOString().split('T')[0];

        const adjustedStartDate = new Date(start_date1);
        adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
        const start_date = adjustedStartDate.toISOString().split('T')[0];

        const adjustedEndDate = new Date(finish_date1);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        const finish_date = adjustedEndDate.toISOString().split('T')[0];

        if(start_date < finish_date){
            const data = { ...formData, company:props.company, phase:"I", start_date, finish_date}
            console.log(data)
            addProject( data, props.onHide, props.setNewProject, user?.work_id, setProjectError, setProject, setFormData, user?.token)
        }else{
            setProjectError("Start date must be before finish date...")
        }
    }

    return (
        <Modal {...props} size="lg" centered
            aria-labelledby="contained-modal-title-vcenter"   
        >
            <Form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                <TextField 
                    id="outlined-basic" label="Title"  variant="standard" 
                    placeholder="Enter a project title" name="title"
                    value={formData.title} required 
                    multiline fullWidth  className="textfield" 
                    onChange={handleInputChange}
                />

                <TextField 
                    id="outlined-basic" label="Description"  variant="standard" 
                    placeholder="Enter a project description" name="description"
                    value={formData.description} required 
                    multiline fullWidth className="textfield" 
                    onChange={handleInputChange}
                />
  


                <DateRange dateRange={dateRange} setDateRange={setDateRange}/>
                    {projectError && <span className="text-danger">{projectError}</span>}
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


export default NewProject