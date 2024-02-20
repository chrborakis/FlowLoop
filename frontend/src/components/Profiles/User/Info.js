import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Card, Row,Col} from 'react-bootstrap';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Info = ({data, admin}) => {
    return(<>   
        <Card>
            {/* <EditNoteIcon /> */}
            { admin && <Button variant="outline-secondary" endIcon={<EditNoteIcon />}>Edit</Button>}
            <Card.Body>
                <Card.Title><h3>User Information</h3></Card.Title>
                <Card.Text>
                    <Row><h4>Occupation: </h4>{data.occupation} </Row>
                    <Row><h4>About: </h4>{data.about}</Row>
                    <Row><h4>Gender: </h4>{data.gender ? "Male" : "Female"}       </Row>    
                    <Row><h4>Country: </h4>{data.country}     </Row>
                    <Row><h4>Phone:</h4>{data.phone}  </Row>
                </Card.Text>
            </Card.Body>
        </Card>  
    </>);
}

export default Info;