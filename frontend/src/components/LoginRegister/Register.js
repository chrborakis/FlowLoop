import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import '../../../static/css/Login.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../../store/AuthContext';
import { getCountries } from '../Extra/Countries';


const Register = ({login}) => {
    const onLogin = (userV) => login(userV)

    const [gender, setGender] = useState('');

    const [countries, setCountries] = useState([]);
    useEffect(() => { getCountries(countries, setCountries)}, []);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ 
        email: '',     password: '',
        firstname: '', lastname: '',
        occupation: '',gender: gender,    
        phone: '',     country: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };

    const handleDropdownSelect = (eventKey, event) => setGender(eventKey);

    const handleRegister = (e) => {
        e.preventDefault()
        setErrors(null)
        formData.gender = gender;
        console.log(formData);

        const newErrors = {};
        Object.keys(formData).forEach( field => {
            if( !formData[field]) newErrors[field] = `Please insert your ${field}`
        })

        if(formData.password.length < 6) 
            newErrors.password = "Password must be more that 6 digits"

        if( Object.keys(newErrors).length>0){
            setErrors(newErrors);
            return;
        }else{
            register();
        }
    }

    const register = async() => {
        formData.gender = gender;
        console.log(formData);

        axios.post('backend/authentication/register', { formData }
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }
        ).then(res => {
            console.log(res.data.error)
            setErrors(res.data.error)
            if(res.data.authenticated){
                console.log(JSON.parse(res.data.user))
                onLogin(JSON.parse(res.data.user));
                console.log('Register request successful:', res.data)
            }
        }).catch(err=>console.error('Error in Register Post request:', err));
    }

    return(
        <div className='form'>
            <Form className='form' onSubmit={handleRegister}>
                <Card className="text-center">  
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstname" type="text" 
                                    placeholder="Enter your First Name" 
                                    value={formData.firstname} onChange={handleInputChange} required  
                                />
                                    {errors?.firstname && <span className="text-danger">{errors?.firstname}</span>}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastname" type="text" 
                                    placeholder="Enter your Last Name" 
                                    value={formData.lastname} onChange={handleInputChange}  required  
                                />
                                    {errors?.lastname && <span className="text-danger">{errors?.lastname}</span>}
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" 
                                placeholder="Enter your Email" 
                                value={formData.email} onChange={handleInputChange} required  
                            />
                                {errors?.email  && <span className="text-danger">{errors?.email}</span>} 
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" 
                                placeholder="Enter your Password" 
                                value={formData.password} onChange={handleInputChange} required  
                            />
                                {errors?.password && <span className="text-danger">{errors?.password}</span>}
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} controlId="dropdown">
                                <Form.Label>Dropdown</Form.Label>
                                <DropdownButton id="dropdown-basic-button" title={gender || 'Select your gender'}
                                    onSelect={handleDropdownSelect}>   
                                    <Dropdown.Item eventKey="M">Male</Dropdown.Item>
                                    <Dropdown.Item eventKey="F">Female</Dropdown.Item>
                                </DropdownButton>
                                    {errors?.gender && <span className="text-danger">{errors?.gender}</span>}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="occupation">
                                <Form.Label>Occupation</Form.Label>
                                <Form.Control name="occupation" type="text" 
                                    placeholder="Enter your Occupation" 
                                    value={formData.occupation} onChange={handleInputChange} required  
                                />
                                    {errors?.occupation && <span className="text-danger">{errors?.occupation}</span>}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="country">
                                <Form.Label>Country</Form.Label>
                                {countries ? (
                                    <Form.Control as="select" name="country" value={formData.country} onChange={handleInputChange} required>
                                            {countries.map((country, index) => (
                                                <option key={index} value={country.country}>
                                                    {country.country}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    ) : (
                                        <Form.Control name="country" type="text"
                                            placeholder="Enter Country"
                                            value={formData.country} onChange={handleInputChange} required
                                        />
                                    )}
                                    {errors?.country && <span className="text-danger">{errors?.country}</span>}
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control name="phone" type="text" 
                                    placeholder="Enter your Phone" 
                                    value={formData.phone} onChange={handleInputChange} required  
                                />
                                    {errors?.phone && <span className="text-danger">{errors?.phone}</span>}
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    )
}

export default Register;