import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../../static/css/Posts/PostForm.css'
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import '../../../static/css/Profile/Forms.css';

import { postPost } from './PostUtils';

const NewPost = ({ user, url, newPost}) => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleButtonClick = () => setIsContentVisible(!isContentVisible); 
    const [formData, setFormData] = useState({ title: '', description: '', image: null,});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setFormData({
            ...formData,
            image: imageFile
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "author": url.includes('public') ? user.id : user.work_id,
            "title": formData.title,
            "body": formData.description,
            ...(formData.image && { "image": formData.image }),
        }
        postPost( url, data, newPost, setIsContentVisible)
    };

    return(<>
        <div className='center-button'>
            <Button variant="primary" onClick={handleButtonClick}> 
                {url.includes('public') ? 'New Post Public' : `New ${user?.company?.name} Post`}
            </Button>
        </div>
            
        { isContentVisible && (
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" required
                        placeholder="Post Title" 
                        value={formData.title} onChange={handleInputChange} 
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formDescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" required
                        placeholder="Post Description" 
                        value={formData.description} onChange={handleInputChange} 
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formImage'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" accept="image/*"
                        onChange={handleImageChange} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )}
        
    </>)
}

export default NewPost;