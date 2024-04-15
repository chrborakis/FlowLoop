import React, {useState, useEffect, useRef} from 'react';
import '../../../static/css/Profile/Profile.css'
import { Container, Row, Col, Card ,Form} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import { changeImage } from './User/UserUtils';
import { useAuth } from '../../store/AuthContext';

const ProfileImage = ({ url, id, image, setImage}) => {
    console.log(url)

    const { user, updateUser} = useAuth(); 
    const formRef = useRef(null);

    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        event.preventDefault();
        changeImage( url, id, event.target.files[0], setImage)
        if(url === "users"){
            updateUser({...user, 'image': event.target.files[0].name})
        }else if(url === "companies"){
            updateUser({...user, company:{...user.company, 'image': event.target.files[0]}})
        }
        console.log(user)
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return(<>
        <Col xs={3} onClick={handleClick}>
            <div className="image-container">
                <img src={image} width={150}/>
                <Form ref={formRef} >
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

export default ProfileImage;