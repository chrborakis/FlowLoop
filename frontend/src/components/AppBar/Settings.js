import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import { TextField } from "@material-ui/core";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { getEmail, updateEmail, updatePassword } from "./UpdateUser";

const Settings = ({user}) => {
    const [modalShow, setModalShow] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({});
    const [error, setError] = useState({email:"", password:""})
    const [success, setSuccess] = useState({email:"", password:""})
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleEmail = (e) => {
        e.preventDefault();
        setSuccess({email: '', password:''})
        setErrors({email: '',  password:''})
        updateEmail(user, email, setSuccess, setErrors)
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setSuccess({email: '', password:''})
        setErrors({email: '',  password:''})
        const newErrors = {};

        if (!password) {newErrors.password = 'Please insert your password';
        } else if (password.length < 6) {newErrors.password = 'Password must be more than 6 characters';}

        if (Object.keys(newErrors).length > 0) {setErrors(newErrors);
        } else {updatePassword(user, password, setSuccess, setErrors)
        }
    };

    useEffect(()=>{
        getEmail(user,setEmail,setPassword,password)
    },[user?.id, updateEmail, updatePassword])

    return (
        <>
            <Button variant="outlined" onClick={() => setModalShow(true)}>Settings</Button>

            {modalShow && (
                <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Change Credentials
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Row>
                            <Col xs={8}>
                            <TextField className="textfield"
                                placeholder="Enter a new Email" name="email" type="email" 
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
                                        label="Password" type={showPassword ? 'text' : 'password'}  placeholder="Enter a new Password" 
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
                    </Form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default Settings;