import React, {useEffect, useState} from "react";
import {Row,Col,Card,ListGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

import Avatar from '@mui/material/Avatar';

const Staff = ({staff}) => {
    console.log(staff)
    return(<>
        <Card className="text-center mx-auto d-block">  
            <Card.Header>Company Staff</Card.Header>
            <Card.Body>        
            {staff?.length > 0 ? (
            <ListGroup variant="flush">
                {staff?.map((result, index) => (
                    index % 2 === 0 && (
                        <ListGroup.Item key={`${result?.id}-${index}`}>
                            <div className="d-flex justify-content-between">
                                <Link to={`/user/${result.employee.slug}`}>
                                    <Badge bg={result.is_admin ? "primary" : "secondary"} title={result.is_admin ? "Admin" : ""} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <Avatar alt={result.employee.name} src={`/files/${result.employee.image}`} width={75} style={{ marginRight: '8px' }} />
                                        <span>{result.employee.name}</span>
                                    </Badge>
                                </Link>
                                {staff[index + 1] && ( 
                                    <Link to={`/user/${staff[index + 1].employee.slug}`}>
                                        <Badge bg={staff[index + 1].is_admin ? "primary" : "secondary"} title={staff[index + 1].is_admin ? "Admin" : ""} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <Avatar alt={staff[index + 1].employee.name} src={`/files/${staff[index + 1].employee.image}`} width={75} style={{ marginRight: '8px' }} />
                                            <span>{staff[index + 1].employee.name}</span>
                                        </Badge>
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