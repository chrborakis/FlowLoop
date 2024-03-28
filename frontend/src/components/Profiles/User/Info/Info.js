import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Card, Row,Col} from 'react-bootstrap';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { getCountries } from '../../../Extra/Countries';
import axios from 'axios';
import Cookies from 'js-cookie';

const Info = ({user, _user, updateUser, admin}) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => { getCountries(countries, setCountries)}, []);
    const [gender, setGender] = useState(user.gender);
    const [error, setError] = useState({
        phone: "",
    })
    const [data, setData] = useState({ 
        user: user.user,
        firstname: user.firstname,
        midname: user.midname,
        lastname: user.lastname,
        occupation: user.occupation, 
        gender: gender, 
        phone: user.phone,
        about: user.about,
        country: user.country,
    });
    const [editMode, setEdit] = useState(false);
    
    const handleDropdownSelect = (eventKey, event) => setGender(eventKey);
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const handleSave = async(e) => {
        e.preventDefault();
        setError({phone:""})
        data.gender = gender;
    
        axios.post(`../backend/user/${user.slug}`, { data }
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }).
        then( res => {
            if(res.data?.status === 200) {
                if(_user.slug != res.data.data.slug){
                    const {firstname, lastname, slug} = res.data.data
                    updateUser({..._user, 'name': firstname+" "+lastname, 'slug': slug})
                    history.pushState(null, null, `/user/${slug}`);
                }
                setEdit(false);
            }
            if(res.data?.error?.phone[0]) {
                console.log("Phone error")
                setError(prevState => ({
                    ...prevState,
                    phone: res.data?.error.phone
                }))
            }
        }).
        catch( er => console.log(er)) 
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({...data,[name]: value,});
    };

    return(<>   
        <Form className='form' onSubmit={handleSave}>
            <Card className="text-center">  
                <Card.Header>User Information</Card.Header>
                <Card.Body>
                    {
                        editMode &&
                        <>
                            <Form.Group as={Col} className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstname" type="text" 
                                    placeholder="Enter your First Name" 
                                    value={data.firstname} onChange={handleInputChange} required  
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="midname">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control name="midname" type="text" 
                                    placeholder="Enter your Mid Name" 
                                    value={data.midname} onChange={handleInputChange}  
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastname" type="text" 
                                    placeholder="Enter your Last Name" 
                                    value={data.lastname} onChange={handleInputChange}  required  
                                />
                            </Form.Group>
                        </>
                    }

                    <Form.Group as={Col} className="mb-3" controlId="occupation">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control name="occupation" type="text" disabled={!editMode}
                            placeholder="Enter your Occupation" 
                            value={data.occupation} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="about">
                        <Form.Label>About</Form.Label>
                        <Form.Control name="occupation" type="text" as="textarea" rows={3} disabled={!editMode}
                            placeholder="Enter your Description" 
                            value={data.about} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicDropdown">
                        <Form.Label>Gender</Form.Label>
                        {
                            !editMode ? (
                                <Form.Control name="gender" type="text"  disabled={!editMode}
                                placeholder="Enter your Gender" 
                                value={data.gender==="M" ? "Male" : "Female"} onChange={handleInputChange} required  
                                />
                            ):(
                                    <DropdownButton id="dropdown-basic-button"  disabled={!editMode} title={data.gender==="M" ? "Male" : "Female" || 'Select your gender'}
                                        onSelect={handleDropdownSelect}> 
                                        <Dropdown.Item eventKey="M">Male</Dropdown.Item>
                                        <Dropdown.Item eventKey="F">Female</Dropdown.Item>
                                    </DropdownButton>
                            ) 
                        }
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        {countries ? (
                            <Form.Control as="select" default={data.country} value={data.country} disabled={!editMode} name="country" onChange={handleInputChange} required>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.country}>
                                        {country.country}
                                    </option>
                                ))}
                            </Form.Control>
                        ) : (
                            <Form.Control name="country" type="text" disabled={!editMode}
                                placeholder="Enter Country"
                                value={data.country} onChange={handleInputChange} required
                            />
                        )}
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control name="phone" type="text"  disabled={!editMode}
                            placeholder="Enter your Phone" 
                            value={data.phone} onChange={handleInputChange} required  
                        />
                            {<span className="text-danger">{error.phone}</span>}
                    </Form.Group>
                </Card.Body>
                <Card.Footer className="text-muted">
                    {
                        editMode ? (
                            <Button variant="primary" type="submit" disabled ={!editMode}>
                                Save
                            </Button>   
                        ) : (
                            // admin && <Button variant="outline-secondary" onClick={handleEdit} endIcon={<EditNoteIcon />}>Edit</Button>
                            admin && <Button variant="outline-secondary" onClick={handleEdit}>Edit</Button>
                        )
                    }

                </Card.Footer>
            </Card>
        </Form>
    </>);
}

export default Info;