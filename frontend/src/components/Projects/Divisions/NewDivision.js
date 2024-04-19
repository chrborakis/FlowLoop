import React, {useState, useEffect} from "react";
import { Container, Col, Row, Card, Form} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import { addDivision} from './DivisionUtils';
import Button from '@mui/material/Button';

import '../../../../static/css/projects.css'
import '../../../../static/css/HomePage.css'

const NewDivision = ({admin_slug, user_slug, setDivisions, project_id}) => {
    const [newDivState, setNewDivState] = useState(false)
    const [newDivision, setNewDivision] = useState({project: project_id, title:'', description:'', file: null})
    const [error,setError] = useState('')

    const showNewDivision = () => {
        setNewDivState(true)
    }

    const adjustInputHeight = (target) => {
        target.style.height = 'auto'; // Reset the height
        target.style.height = `${target.scrollHeight}px`; // Set the height to the scroll height
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDivision({...newDivision,[name]: value,});
        adjustInputHeight(event.target);
    };

    const submitNewDiv = ( event) => {
        event.preventDefault()
        setError('')
        addDivision( project_id, newDivision, setDivisions, setNewDivision, setError, setNewDivState)
    }

    return(<>
        {admin_slug === user_slug && (
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
                    <Form.Group className='mb-3' controlId='formTitle'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="textarea" value={newDivision.title} required
                            placeholder="Enter a project title" name="title"
                            onChange={handleInputChange}
                            rows={1} style={{ resize: "none", maxHeight: "20em", overflowY: "auto" }}
                        />
                        { error && <span className="text-danger">{error}</span>}
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formDescription'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={newDivision.description} required
                            placeholder="Enter a project description" name="description"
                            onChange={handleInputChange}
                            rows={1} style={{ resize: "none", maxHeight: "20em", overflowY: "auto" }}
                        />
                    </Form.Group>
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