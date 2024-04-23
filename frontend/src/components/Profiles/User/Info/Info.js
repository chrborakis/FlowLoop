import React, {useState, useEffect} from 'react';
import {Card, Row,Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { getCountries } from '../../../Extra/Countries';
import axios from 'axios';
import Cookies from 'js-cookie';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';

import '../../../../../static/css/index.css'

const Info = ({user, _user, updateUser, admin}) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => { getCountries(countries, setCountries)}, []);

    const [gender, setGender] = useState(user.gender);
    const [error, setError] = useState({phone: "",})

    const handleSelect = (event) => {setGender(event.target.value);};
  
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

    useEffect(() => {setData(prevData => ({...prevData,gender: gender}))}, [gender]);

    const [editMode, setEdit] = useState(false);
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const handleSave = async(e) => {
        e.preventDefault();
        setError({phone:""})
        data.gender = gender;

        axios.patch(`../backend/api/users/${user.slug}`, data
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}).
        then( res => {
            console.log(res)
            if(res.status === 200) {
                setEdit(false);
                if(_user.slug != res.data.slug){
                    const {firstname, lastname, slug} = res.data
                    updateUser({..._user, 'name': firstname+" "+lastname, 'slug': slug})
                    history.pushState(null, null, `/user/${slug}`);
                }
            }
        }).
        catch( err => {
            console.log(err)
            if(err.response.data.phone[0]) setError(prevState => ({...prevState,phone: err.response.data.phone}))
        }) 
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({...data,[name]: value,});
    };

    return(<>   
        <Form className='form' onSubmit={handleSave} style={{textDecoration:'none'}}>
            <Card className="text-center">  
                <Card.Header>User Information</Card.Header>
                <Card.Body>
                    {
                        editMode &&
                        <>
                            <TextField disabled={!editMode} variant="standard" className="textfield" 
                                placeholder="Enter your First Name" name="first_name"
                                label="First Name" required multiline fullWidth 
                                value={data.firstname} onChange={handleInputChange}
                            />
                            <TextField disabled={!editMode} variant="standard" className="textfield" 
                                placeholder="Enter your Middle Name" name="middle_name"
                                label="Middle Name" multiline fullWidth 
                                value={data.midname} onChange={handleInputChange}
                            />
                            <TextField disabled={!editMode} variant="standard" className="textfield" 
                                placeholder="Enter your Last Name" name="last_name"
                                label="Last Name" required multiline fullWidth 
                                value={data.lastname} onChange={handleInputChange}
                            />
                        </>
                    }

                    <TextField disabled={!editMode} variant="standard" className="textfield" 
                        placeholder="Enter your Occupation" name="occupation"
                        label="Occupation" required multiline fullWidth 
                        value={data.occupation}
                        onChange={handleInputChange}
                    />

                    <TextField disabled={!editMode} variant="standard" className="textfield" 
                        placeholder="Enter your About" name="about"
                        label="About" required multiline fullWidth 
                        value={data.about}
                        onChange={handleInputChange}
                    />

                    <FormControl fullWidth className="textfield">
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Gender
                        </InputLabel>
                        <NativeSelect defaultValue={'M'} inputProps={{name: 'Gender', id: 'uncontrolled-native',}} value={gender} onChange={handleSelect} required disabled={!editMode}>
                            <option value={'M'}>Male</option>
                            <option value={'F'}>Female</option>
                        </NativeSelect>
                    </FormControl>

                    <FormControl fullWidth disabled={!editMode} className="textfield">
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Country
                        </InputLabel>
                        <NativeSelect defaultValue={data.country} name='country' value={data.country} onChange={handleInputChange} required>
                            {countries ? (
                            countries.map((country, index) => (
                                <option key={index} value={country.country}>
                                    {country.country}
                                </option>
                            ))
                            ) : (<option value="">Loading countries...</option>)}
                        </NativeSelect>
                    </FormControl>

                    <TextField disabled={!editMode} variant="standard" className="textfield" 
                        placeholder="Enter your Phone" name="phone"
                        label="Phone" required multiline fullWidth 
                        value={data.phone}onChange={handleInputChange} inputProps={{ inputMode: 'numeric' }}
                    />
                    {<span className="text-danger">{error.phone}</span>}

                </Card.Body>
                <Card.Footer className="text-muted">
                    {editMode ? (
                        <Button variant="contained" color="success" type="submit" disabled ={!editMode}>
                            Save
                        </Button>   
                    ) : (admin && <Button variant="secondary" onClick={handleEdit}>Edit</Button>)}
                </Card.Footer>
            </Card>
        </Form>
    </>);
}

export default Info;