import React,{useState,useEffect} from "react";
import { Container, Col, Row, Card, Button, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {scrollTop} from '../../../Extra/LinkOnTop'
import { BsFillShiftFill } from "react-icons/bs";
import {uploadDivision} from './ProjectUtils';
import { useAuth } from '../../../../store/AuthContext';

import '../../../../../static/css/projects.css';

const Division = ({division,setDivisions}) => {
    const { user} = useAuth();
    const [ file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event, division_id) => {
        event.preventDefault();
        if (!file) {
            const inputField = document.querySelector('.form-control'); // Select the input field
            inputField.classList.add('shake'); // Add the shake class to trigger the animation
            setTimeout(() => {
                inputField.classList.remove('shake'); // Remove the shake class after the animation finishes
            }, 1000); // Adjust the duration to match the animation duration
        } else {
            uploadDivision( division_id, setDivisions, file)
        }
        
    };

    return(<>
        <Card id={division.division} style={{ width: '90%', marginTop: '10px' }}>
            <Card.Header>
            <Row>
                <Link to={`/user/${division.assign?.slug}`} onClick={scrollTop}>
                    <img src={`/files/${division.assign?.image}`} width={60}/>
                    {division.assign?.name}
                </Link>
            </Row>                       
            </Card.Header>
            <Card.Body>
                <Card.Title>{division.title}</Card.Title>
                <Card.Text>{division.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <>
                {division.file && 
                    <a href={division.file} target="_blank" rel="noopener noreferrer">{division.file}</a>
                }
                {
                    parseInt(user?.work_id) === parseInt(division.assign?.work_id) && (
                        <Form onSubmit={ (event) => handleSubmit( event, division.division)}><Row>
                            <Col xs={9}>
                                <Form.Control className="file-input" type="file" onChange={handleFileChange} />
                            </Col>
                            <Col xs={3}> 
                                <Button className="button" type="submit">
                                    <BsFillShiftFill className="icon" />
                                </Button>
                            </Col>
                        </Row></Form>
                    )
                }
                </>
            </Card.Footer>
        </Card>
    </>)
}

export default Division;