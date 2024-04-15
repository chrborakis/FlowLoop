import React, {useState, useEffect} from "react";
import { Container, Col, Row, Card, Button, Form} from 'react-bootstrap';
import "../../../../../static/css/projects.css"
import "../../../../../static/css/HomePage.css"
import { BsPlusLg } from "react-icons/bs";
import {addDivision} from "./ProjectUtils"

const NewDivision = ({admin_slug, user_slug, setDivisions, project_id}) => {
    const [newDivState, setNewDivState] = useState(false)
    const [newDivision, setNewDivision] = useState({project: project_id, title:'', description:'', file: null})

    const showNewDivision = () => {
        setNewDivState(true)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDivision({...newDivision,[name]: value,});
    };

    const submitNewDiv = ( event) => {
        event.preventDefault()
        console.log("New Division -> ", newDivision)
        addDivision( project_id, newDivision, setDivisions, setNewDivision)
    }

    return(<>
        {admin_slug === user_slug && (
            !newDivState ? (
                <Button onClick={showNewDivision}>Add Division<BsPlusLg/></Button>
            ) : (
                <Form onSubmit={submitNewDiv}>
                    <Form.Group className='mb-3' controlId='formTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" required
                        placeholder="Title" 
                        value={newDivision.title} onChange={handleInputChange} 
                    />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formDescription'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" required
                            placeholder="Description" 
                            value={newDivision.description} onChange={handleInputChange} 
                        />
                    </Form.Group>
                    <Button type="submit">
                        <BsPlusLg/>
                    </Button>
                </Form>
            ) 
        )}
    </>)
}

export default NewDivision;