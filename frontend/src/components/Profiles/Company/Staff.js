import React, {useEffect, useState} from "react";
import {Button,Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Row,Col,Dropdown,Card,ListGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Staff = ({staff}) => {
    console.log(staff)

    return(<>
        <Card className="text-center mx-auto d-block">  
            <Card.Header>Company Address</Card.Header>
            <Card.Body>        
            {staff?.length > 0 ? (
            <ListGroup variant="flush">
                {staff?.map((result, index) => (
                    index % 2 === 0 && (
                        <ListGroup.Item key={result?.id}>
                            <div className="d-flex justify-content-between">
                                <Link to={`/user/${result.employee.slug}`}>
                                    <div>
                                        <img src={`/files/${result.employee.image}`} width={60}/>
                                        {result.employee.name}
                                    </div>
                                </Link>
                                {staff[index + 1] && ( // Check if next item exists
                                    <Link to={`/user/${staff[index + 1].employee.slug}`}>
                                        <div>
                                            <img src={`/files/${staff[index + 1].employee.image}`} width={60}/>
                                            {staff[index + 1].employee.name}
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </ListGroup.Item>
                    )
                ))}
            </ListGroup>
        ) : (<p>No users found</p>)}
            </Card.Body>
            <Card.Footer className="text-muted">
            </Card.Footer>
        </Card>
    </>)
}

export default Staff;