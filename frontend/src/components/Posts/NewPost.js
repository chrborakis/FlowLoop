import React, { useState, useRef} from "react";
import {Modal, Form, Dropdown, Row, Col, Container, Card } from "react-bootstrap"
import {TextField} from '@material-ui/core';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { postPost } from './PostUtils';
import '../../../static/css/Posts/PostForm.css'
import '../../../static/css/Profile/Forms.css';
import '../../../static/css/form.css';
import '../../../static/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const NewPost = (props) => {   
    const [formData, setFormData] = useState({ title: '', description: '', image: null,});
    const [errors, setErrors] = useState({ title: '', description: '', image: ''})

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };

    const fileInputRef = useRef(null);
    const handleButtonClick = () => fileInputRef.current.click()

    const handleFileChange = (event) => {
        if( event.target.files[0]){
            const imageFile = event.target.files[0];
            setFormData({...formData,image: imageFile});
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "author": props.url.includes('public') ? props.user.id : props.user.work_id,
            "title": formData.title,
            "body": formData.description,
            ...(formData.image && { "image": formData.image }),
        }
        postPost( props.url, data, props.newPost, props.onHide, setErrors, setFormData, props.user.token)
    };

    return (
        <Modal {...props} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Create a Post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <TextField className="textfield" label="Title" variant="standard" 
                        placeholder="Enter a post title" name="title"
                        value={formData.title} required multiline fullWidth
                        onChange={handleInputChange}
                    />
                    {errors.title && <span className="text-danger">{errors.title}</span>}
                    <TextField className="textfield" label="Description" variant="standard" 
                        placeholder="Enter a post description" name="description"
                        value={formData.description} required multiline fullWidth 
                        onChange={handleInputChange}  
                    />
                    {errors.description && <span className="text-danger">{errors.description}</span>}
                    <TextField className="textfield" label="Image" variant="standard"
                        placeholder="Insert image"  onClick={handleButtonClick}
                        value={formData?.image?.name || 'None'} fullWidth
                        InputProps={{startAdornment: <CloudUploadIcon/>,readOnly: true,}}   
                    />
                    <Form.Control ref={fileInputRef}
                        className="file-input" type="file" accept="image/*"
                        onChange={handleFileChange} style={{ display: 'none', width: '95%' }}
                    />
                    {errors.image && <span className="text-danger">{errors.image}</span>}
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant="contained" color="success" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};


export default NewPost