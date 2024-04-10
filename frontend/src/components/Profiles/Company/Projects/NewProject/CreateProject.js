import React, {useEffect, useState} from "react";
import {Modal,Button, Form,Dropdown,Row,Col } from "react-bootstrap"
import DatePicker from 'react-datepicker';
import ProjectForm from './ProjectForm'
import DivisionsForm from './DivisionsForm';
import axios from 'axios';
import Cookies from 'js-cookie';


const CreateProject = (props) => {
    const [nextForm, setNextForm] = useState(false);
    const [projectValid, setProjectValid] = useState(false);
    const [projectError, setProjectError] = useState()

    const projectSubmit = async() => {
        if(!projectError) {
            setProjectValid(true);
        } else {
            setProjectValid(false);
        }
        console.log("projectValid", projectValid)
    };

    return (
        <Modal {...props} size="lg" centered
            aria-labelledby="contained-modal-title-vcenter"   
        >
            {!projectValid ? (
                <ProjectForm company={props.company} onSubmit={projectSubmit} projectError={projectError} setProjectError={setProjectError} setNewProject={props.setNewProject} setNextForm={setNextForm}/>
            ) : (
                nextForm && <DivisionsForm data={secondFormData} onSubmit={handleSecondFormSubmit} />
            )}
        </Modal>
    );
};


export default CreateProject