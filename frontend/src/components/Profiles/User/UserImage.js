import React, {useState, useEffect, useRef} from 'react';
import '../../../../static/css/Profile/Profile.css'
import { Container, Row, Col, Card ,Form} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

const UserImage = ({ image, setImage}) => {
    const formRef = useRef(null);

    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        formRef.current.submit();
    };

    const handleClick = () => {
        console.log('click')
        fileInputRef.current.click();
    };

    const handleSubmit = ( e) => {
        console.log(image)
        e.preventDefault()
    }

    return(<>
        <Col xs={3} onClick={handleClick}>
            <div className="image-container">
                <img src={image} width={150}/>
                <Form ref={formRef} onSubmit={console.log(image)}>
                    <Form.Control type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef}
                            onChange={handleImageChange} 
                        />
                </Form>
                <div className="overlay">
                    <div className="overlay-text">Change Image</div>
                </div>
            </div>
        </Col>
    </>)
}

export default UserImage;