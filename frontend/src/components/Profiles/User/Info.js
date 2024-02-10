import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Info = ({data}) => {
    return(<>   
        <Card>
            <Card.Body>
                <Card.Title><h3>User Information</h3></Card.Title>
                <Card.Text>
                    <><p><h4>Occupation: </h4>{data.occupation} </p> </>
                    <><p><h4>About: </h4>{data.about} </p>  </>
                    <><p><h4>Gender: </h4>{data.gender ? "Male" : "Female"} </p>       </>          
                    <><p><h4>Country: </h4>{data.country} </p>    </>
                    <><p><h4>Phone:</h4>{data.phone} </p>  </>
                </Card.Text>
            </Card.Body>
        </Card>  
    </>);
}

export default Info;