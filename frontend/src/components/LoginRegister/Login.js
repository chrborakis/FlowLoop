import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import '../../../static/css/Login.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = ({login}) => {
    const onLogin = (userV) => login(userV)  

    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({ email: '', password: ''});
    const handleLogin = async(e) => {
        e.preventDefault()
        axios.post('backend/authentication/login', { email, password
        },{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }
        ).then(res => {
            if(res.data.authenticated){
                onLogin(JSON.parse(res.data.user));
                console.log('Login Post request successful:', res.data)
            }
        }).catch(err=>console.error('Error in Login Post request:', err));
    }

    return(
        <div className='form'>
            <Form className='form' onSubmit={handleLogin}>
                <Card className="text-center">  
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" 
                                placeholder="Enter your Email" 
                                value={email} onChange={(e)=>setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" 
                                placeholder="Enter your Password" 
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    )
}

export default Login;