import React, {useState, useEffect} from "react";
import { Container, Col, Row, Card, Form} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import { addDivision} from './DivisionUtils';
import Button from '@mui/material/Button';
import {TextField} from '@material-ui/core';
import '../../../../static/css/projects.css'
import '../../../../static/css/HomePage.css'
import '../../../../static/css/index.css'

const NewDivision = ({admin_slug, user, setDivisions, project_id}) => {
    const [newDivState, setNewDivState] = useState(false)
    const [newDivision, setNewDivision] = useState({project: project_id, title:'', description:'', file: null})
    const [error,setError] = useState('')

    const showNewDivision = () => setNewDivState(true)
    
    const adjustInputHeight = (target) => {
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDivision({...newDivision,[name]: value,});
        adjustInputHeight(event.target);
    };

    const submitNewDiv = ( event) => {
        event.preventDefault()
        setError('')
        addDivision( project_id, newDivision, setDivisions, setNewDivision, setError, setNewDivState, user?.token)
    }

    return(<>
        {admin_slug === user?.slug && (
            !newDivState ? (
                <Button variant="solid" color="primary" onClick={showNewDivision}>Add Division</Button>
            ) : (
                <Row className="justify-content-center">
                <Card className="new-division"  style={{ width: '95%' }}>
                    <Card.Header>
                        New Division
                    </Card.Header>
                    <Card.Body>
                    <Form onSubmit={submitNewDiv}>
                        <TextField 
                            id="outlined-basic" label="Title"  variant="standard" 
                            placeholder="Enter a division title"  name="title"
                            value={newDivision.title} required 
                            multiline fullWidth  className="textfield"  
                            onChange={handleInputChange}
                        />
                        { error && <span className="text-danger">{error}</span>}
                        <TextField 
                            id="outlined-basic" label="Description"  variant="standard" 
                            placeholder="Enter a division description"  name="description"
                            value={newDivision.description} required
                            multiline fullWidth className="textfield" 
                            onChange={handleInputChange}
                        />
                        <Button variant="contained" type="success">
                            <BsPlusLg/>
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
                </Row>
            ) 
        )}
    </>)
}

export default NewDivision;