import React, {useState, useEffect} from 'react';
import {Form,Card,Col} from 'react-bootstrap';

import { createAddress, getAddress, updateAddress } from '../CompanyUtils';
import { getCountries } from '../../../Extra/Countries';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';

import Button from '@mui/material/Button';

import '../../../../../static/css/index.css'

const Address = ({company_id, address, admin, token}) => {
    const [data, setData] = useState({ 
        country: address?.country,
        city:    address?.city,
        street:  address?.street,
    });

    const [editMode, setEdit] = useState(false);

    const [error,setErrors] = useState("")
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => { 
        getCountries(countries, setCountries)
    }, []);

    useEffect(() => {
        if(data?.country){
            const selectedCountry = countries.find((c) => c.country === data?.country);
            if(selectedCountry){
                setCities(selectedCountry.cities);
                setData(prevAddress => ({
                    ...prevAddress,
                    city: selectedCountry.cities.includes(data?.city) ? data?.city : selectedCountry.cities[0],
                    street: data?.street || 'No street added'
                }));
            }
        }
    }, [data?.country, countries, data?.city]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({...data,[name]: value,});
    };
    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEdit(true);
    }
    
    const handleSave = async(e) => {
        e.preventDefault();
        setErrors("");
        console.log(data)
        if(address?.id){
            updateAddress( address.id, data, setEdit, setErrors, token)
        }else{
            createAddress( company_id, data, setEdit, setErrors, token)
        }
    }
    
    return(<>  
        <Form className='form' onSubmit={handleSave}>
            <Card className="text-center">  
                <Card.Header>Company Address</Card.Header>
                <Card.Body>        
                    {!address && !editMode ? (
                        <p>No address information yet</p>
                    ) : (<>
                        <FormControl fullWidth disabled={!editMode} className="textfield">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Country
                            </InputLabel>
                            <NativeSelect name='country' defaultValue={data?.country} value={data?.country} onChange={handleInputChange}
                                required IconComponent={editMode ? undefined : () => null}>
                                {countries ? (
                                    countries.map((country, index) => (
                                        <option key={index} value={country.country}>
                                            {country.country}
                                        </option>
                                    ))
                                ) : (<option value="">Loading countries...</option>)}
                            </NativeSelect>
                        </FormControl>
                            
                        <FormControl fullWidth disabled={!editMode} className="textfield">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                City
                            </InputLabel>
                            <NativeSelect name='city' defaultValue={data?.city} value={data?.city} onChange={handleInputChange}
                                required IconComponent={editMode ? undefined : () => null}>
                                {cities ? (
                                    cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))
                                ) : (<option value="">Loading cities...</option>)}
                            </NativeSelect>
                        </FormControl>
                            
                        <TextField disabled={!editMode} variant="standard" className="textfield" 
                            placeholder="Enter company's street" name="street"
                            label="Street" required multiline fullWidth 
                            value={data.street}
                            onChange={handleInputChange}
                        />
                        {error && <span className="text-danger">{error}</span>}
                    </>)}
                </Card.Body>
                <Card.Footer className="text-muted">
                    {editMode ? (
                        <Button variant="contained" color="success" type="submit" disabled ={!editMode}>
                            Save
                        </Button>   
                    ) : (
                        admin && <Button variant="secondary" type="button" onClick={handleEdit}>Edit</Button>
                    )}
                </Card.Footer>
            </Card>
        </Form>
    </>);
}

export default Address;


