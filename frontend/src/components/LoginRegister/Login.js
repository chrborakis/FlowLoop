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

    // const [email, setEmail]       = useState('');
    // const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({ email: '', password: ''});
    const [errors, setErrors] = useState({});

    const [error, setError] = useState({email:"", password:""})
    
    const handleLogin = (e) => {
        e.preventDefault()
        setError({email:"", password:""})
        console.log(formData)

        const newErrors = {};
        Object.keys(formData).forEach( field => {
            if( !formData[field]) newErrors[field] = `Please insert your ${field}`
        })

        if(formData.password.length < 6) newErrors.password = "Password must be more that 6 digits"

        if( Object.keys(newErrors).length>0) setErrors(newErrors);
        else doLogin();
        
    }

    const doLogin = async(e) => {
        axios.post('backend/authentication/login', { formData},
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }
        ).then(res => {
            if(res.data.authenticated){
                let user = JSON.parse(res.data.user);
                if( user.image === "") user.image = "user_image/dummy-user.png"
                onLogin(user);
                console.log('Login Post request successful:', res.data)
            }
            if(res.data?.account === true) {setError(prevState => ({
                ...prevState,
                email: res.data?.message
                }))
            }
            else if(res.data?.password === true) {setError(prevState => ({
                ...prevState,
                password: res.data?.message
                }))
            }
            console.log(error)
        
        }).catch(err=>console.error('Error in Login Post request:', err));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };

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
                                value={formData.email} onChange={handleInputChange} required
                                // value={email} onChange={(e)=>setEmail(e.target.value)}
                            />
                            {/* <Form.Control.Feedback type="invalid"> */}
                                {errors.email } 
                                <span class="text-danger">{error.email}</span>
                            {/* </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" 
                                placeholder="Enter your Password" 
                                value={formData.password} onChange={handleInputChange} required
                                // value={password} onChange={(e)=>setPassword(e.target.value)}
                            />
                            {/* <Form.Control.Feedback type="invalid"> */}
                                {errors.password } 
                                <span class="text-danger">{error.password}</span>
                            {/* </Form.Control.Feedback> */}
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