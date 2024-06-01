import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import axios from 'axios'
import Cookies from 'js-cookie'
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { updateEmail, updatePassword } from "./UpdateUser";

const Settings = ({user_id}) => {
    const [modalShow, setModalShow] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [formData, setFormData] = useState({ email: '', password: ''});
    const [errors, setErrors] = useState({});
    const [error, setError] = useState({email:"", password:""})

    const [success, setSuccess] = useState({email:"", password:""})

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleEmail = (e) => {
        e.preventDefault();
        setSuccess({email: '', password:''})
        setErrors({email: '',  password:''})
        updateEmail(user_id, email, setSuccess, setErrors)
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setSuccess({email: '', password:''})
        setErrors({email: '',  password:''})
        const newErrors = {};

        if (!password) {
            newErrors.password = 'Please insert your password';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be more than 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            updatePassword(user_id, password, setSuccess, setErrors)
        }
    };

    useEffect(()=>{
        axios.get(`${window.location.origin}/backend/api/usercredentials/${user_id}`,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
        ).then(res => {
            console.log(res)
            if (res.status === 200) {
                setEmail(res.data.email)
                setPassword(password)
                // setFormData({ email: res.data.email, password: formData.password });
            }
        }).catch(err=>console.error('Error Getting Email', err.response));
    },[user_id, updateEmail, updatePassword])

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     const trimmedValue = name === 'password' ? value.trim() : value;
    //     setFormData({...formData,[name]: trimmedValue,});
    // };

    return (
        <>
            <Button variant="outlined" onClick={() => setModalShow(true)}>Settings</Button>

            {modalShow && (
                <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Settings
                        </Modal.Title>
                    </Modal.Header>
                    <Form>
                    <Modal.Body>
                        <Row>
                            <Col xs={8}>
                            <TextField className="textfield"
                                placeholder="Enter your Email" name="email" type="email" 
                                label="Email" required fullWidth 
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="text-danger">{errors.email}</span>
                            <span className="text-success">{success.email}</span>
                            </Col>
                            <Col xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button variant="contained" color="success" onClick={handleEmail}>Update</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={8}>
                                <FormControl fullWidth style={{marginTop:'10%'}}>
                                    <TextField className="textfield" 
                                        label="Password" type={showPassword ? 'text' : 'password'}  placeholder="Enter your Password" 
                                        name="password" required  value={password} onChange={(e) => setPassword(e.target.value.trim())}
                                    />
                                    <Form.Text className="text-muted">
                                        {showPassword ? (
                                        <VisibilityOff onClick={handleClickShowPassword} />
                                        ) : (<Visibility onClick={handleClickShowPassword} />)}
                                    </Form.Text>
                                </FormControl>
                                <span className="text-danger">{errors.password}</span>
                                <span className="text-success">{success.password}</span>
                            </Col>
                            <Col xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button variant="contained" color="success" onClick={handlePassword}>Update</Button>
                            </Col>
                        </Row>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="secondary" onClick={() => setModalShow(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                    </Form>
                    
                </Modal>
            )}
        </>
    );
}

export default Settings;