import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../../static/css/PostForm.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewPost = ({ user, url, newPost}) => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleButtonClick = () => setIsContentVisible(!isContentVisible); 
    const [formData, setFormData] = useState({ title: '', description: '', image: null,});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setFormData({
                ...formData,
                image: reader.result,
            });};
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "author": url.includes('public') ? user.id : user.work_id,
            "title": formData.title,
            "body": formData.description,
            ...(formData.image && { "image": formData.image }),
        }

        console.log("data: ", data)

        await axios.post(url, data,
        {
            headers: {'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'application/json'}
        }
        ).then(  res => {
            {console.log("New Post res.data: ", res.data)
            newPost(res.data);
            setIsContentVisible(false)}
        }).catch( err => console.log(err.message))
      };

    return(<>
        <button onClick={handleButtonClick}> 
            {url.includes('public') ? 'New Post Public' : `New ${user?.company?.name} Post`}
        </button>

        { isContentVisible && (
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" 
                        placeholder="Post Title" 
                        value={formData.title} onChange={handleInputChange} 
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formDescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" 
                        placeholder="Post Description" 
                        value={formData.description} onChange={handleInputChange} 
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