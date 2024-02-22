import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Card, Row,Col} from 'react-bootstrap';
import { getUniversity, getEducation } from './UserUtils'

const Education = ({user, admin}) => {
    const [education, setEducation] = useState();
    const [university, setUniversity] = useState([]);

    useEffect( () => {
        getEducation(user,  setEducation)
        getUniversity(user, setUniversity)
    },[])

    return(<>   
        <Card>
            <Card.Body>
            <Card.Title><h3>Education</h3></Card.Title>
                {
                    education ? (<>
                        <Row><h4>Name: </h4> {education?.name}</Row>
                        <Row><h4>Graduation: </h4> {education?.graduation}</Row>
                    </>) : (
                        <div>No education information available</div>
                        )
                    }
            </Card.Body>
            { admin && <Button variant="outline-secondary">Edit</Button>}
        </Card>
        <Card>
            <Card.Body>
            <Card.Title><h3>University</h3></Card.Title>
                {
                    university ? (
                        university.map(uni => (
                            <div key={uni.id}>
                                <Row><h4>Name: </h4> {uni?.name}</Row>
                                <Row><h4>Graduation: </h4> {uni?.graduation}</Row>
                                <Row><h4>Degree: </h4> {uni?.degree}</Row>
                            </div>
                        ))
                        ) : (
                            <div>No university information available</div>
                            )
                        }
            </Card.Body>
        { admin && <Button variant="outline-secondary">Edit</Button> }
        </Card>  
    </>);
}

export default Education;