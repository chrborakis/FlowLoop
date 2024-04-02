import React, {useEffect, useState} from "react";
import {Button,Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Row,Col,Dropdown,Card,ListGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

const Friends = ({friends}) => {
    return(<>
        <Card className="text-center mx-auto d-block">  
            <Card.Header>Friends</Card.Header>
            <Card.Body>        
            {friends?.length > 0 ? (
            <ListGroup variant="flush">
                {friends?.map((result, index) => (
                    index % 2 === 0 && (
                        <ListGroup.Item key={`${result?.id}-${index}`}>
                            <div className="d-flex justify-content-between">
                                <Link to={`/user/${result.friend_info.slug}`}>
                                    <img src={`/files/${result.friend_info.image}`} width={60}/>
                                    {result.friend_info.name}
                                </Link>
                                {friends[index + 1] && ( 
                                    <Link to={`/user/${friends[index + 1].friend_info.slug}`}>
                                        <img src={`/files/${friends[index + 1].friend_info.image}`} width={60}/>
                                        {friends[index + 1].friend_info.name}
                                    </Link>
                                )}
                            </div>
                        </ListGroup.Item>
                    )
                ))}
            </ListGroup>
        ) : (<p>No friends found</p>)}
            </Card.Body>
            <Card.Footer className="text-muted">
            </Card.Footer>
        </Card>
    </>)
}

export default Friends;