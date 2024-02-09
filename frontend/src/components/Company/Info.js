import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Info = ({data}) => {
    return(<>   
        <Card>
            <Card.Body>
                <Card.Title><h3>Company Information</h3></Card.Title>
                <Card.Text>
                <div>
                    <p><h4>About: </h4>{data.description} </p> 
                    <p><h4>Started: </h4>{data.establishment_date} </p> 
                    <p><h4>Phone:</h4>{data.phone} </p> 
                </div>
                </Card.Text>
            </Card.Body>
        </Card>  
    </>);
}

export default Info;