import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import '../../../static/css/Login.css';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../../store/AuthContext';
import { getCountries } from '../Extra/Countries';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Button, TextField} from '@material-ui/core'

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
        const trimmedValue = name === 'password' ? value.trim() : value;
        setFormData({
            ...formData,
            [name]: trimmedValue,
        });
    };
    
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSelect = (event) => {setGender(event.target.value);};

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

    const register = async(e) => {
        formData.gender = gender;

        axios.post('http://127.0.0.1:8000/backend/authentication/signup', formData,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
        ).then(res => {
            console.log(res)
            if(res.status === 200){
                const user = res.data.user
                onLogin({
                    token: res.data.token,
                    id:user.user, 
                    name:user.firstname+ ' ' +user.lastname,
                    slug:user.slug,
                });
                console.log('Register Post request successful:', res.data)
            }else setErrors(res.data.error)
            
        }).catch(err=>{
            console.error('Error in Register Post request:', err.response)
            setErrors(err.response.data)
        });
    }

    // const register = async() => {
    //     formData.gender = gender;
    //     console.log(formData);

    //     axios.post('backend/authentication/register', { formData }
    //     ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }
    //     ).then(res => {
    //         console.log(res.data.error)
    //         setErrors(res.data.error)
    //         if(res.data.authenticated){
    //             console.log(JSON.parse(res.data.user))
    //             onLogin(JSON.parse(res.data.user));
    //             console.log('Register request successful:', res.data)
    //         }
    //     }).catch(err=>console.error('Error in Register Post request:', err));
    // }

    return(
        <div className='form'>
            <Form className='form' onSubmit={handleRegister}>
                <Card className="text-center">  
                    <Card.Header>Register</Card.Header>
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="firstname">
                                <TextField value={formData.firstname} onChange={handleInputChange}
                                    id="outlined-textarea" type='text' name='firstname'
                                    label="First Name" placeholder="Enter your First Name"
                                    multiline required
                                />
                                {errors?.firstname && <span className="text-danger">{errors?.firstname}</span>}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="lastname">
                                <TextField value={formData.lastname} onChange={handleInputChange}
                                    id="outlined-textarea" label="Last Name" placeholder="Enter your Last Name"
                                    multiline required  type='text' name='lastname'
                                />
                                {errors?.lastname && <span className="text-danger">{errors?.lastname}</span>}
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col} className="mb-3" controlId="email">
                            <TextField value={formData.email} onChange={handleInputChange}
                                id="outlined-textarea" label="E-Mail" placeholder="Enter your E-Mail"
                                multiline required fullWidth  type='email' name='email'
                            />
                                {errors?.email && <span className="text-danger">{errors?.email}</span>}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="password">
                            <FormControl variant="outlined" fullWidth style={{marginTop:'10%'}}>
                                <TextField  id="outlined-adornment-password"  className="textfield"
                                    label="Password" type={showPassword ? 'text' : 'password'}  placeholder="Enter your Password" 
                                    name="password" required  value={formData.password}  onChange={handleInputChange}
                                />
                                <Form.Text className="text-muted">
                                    {showPassword ? (
                                    <VisibilityOff onClick={handleClickShowPassword} />
                                    ) : (<Visibility onClick={handleClickShowPassword} />)}
                                </Form.Text>
                                {errors?.password  && <span className="text-danger">{errors?.password}</span>} 
                            </FormControl>
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} controlId="dropdown">
                                <FormControl fullWidth className="textfield">
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Gender
                                    </InputLabel>
                                    <NativeSelect inputProps={{name: 'Gender', id: 'uncontrolled-native',}} value={gender} onChange={handleSelect} required>
                                        <option value="" disabled></option>
                                        <option value={'M'}>Male</option>
                                        <option value={'F'}>Female</option>
                                    </NativeSelect>
                                </FormControl>
                                {errors?.gender && <span className="text-danger">{errors?.gender}</span>}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="occupation">
                                <TextField value={formData.occupation} onChange={handleInputChange}
                                    id="outlined-textarea"
                                    label="Occupation" placeholder="Enter your Occupation"
                                    multiline type='text' name='occupation'
                                />
                                    {errors?.occupation && <span className="text-danger">{errors?.occupation}</span>}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="country">
                                <FormControl className="textfield">
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Country
                                    </InputLabel>
                                    <NativeSelect name='country' defaultValue={formData?.country} value={formData?.country} onChange={handleInputChange}>
                                        {countries ? (
                                            <>
                                            <option value="" disabled></option>
                                            {countries.map((country, index) => (
                                                <option key={index} value={country.country}>
                                                    {country.country}
                                                </option>
                                            ))}
                                            </>
                                        ) : (<option value="">Loading countries...</option>)}
                                    </NativeSelect>
                                </FormControl>
                                    {errors?.country && <span className="text-danger">{errors?.country}</span>}
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="phone">
                                <TextField value={formData.phone} onChange={handleInputChange}
                                    id="outlined-textarea" label="Phone" placeholder="Enter your Phone"
                                    multiline type='text' name='phone'
                                    helperText="Provide number with +code, e.g., +1234567890"
                                />
                                    {errors?.phone && <span className="text-danger">{errors?.phone}</span>}
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button variant="contained" color="primary" type="submit">
                            Register
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    )
}

export default Register;