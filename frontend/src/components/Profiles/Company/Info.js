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
                    <div><h4>About:</h4>   <p>{data.description} </p> </div>
                    <div><h4>Started:</h4> <p>{data.establishment_date} </p> </div>
                    <div><h4>Phone:</h4>   <p>{data.phone} </p> </div>
                </div>
                </Card.Text>
            </Card.Body>
        </Card>  
    </>);
}

export default Info;


