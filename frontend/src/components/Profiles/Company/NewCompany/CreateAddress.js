import React, {useState, useEffect, useRef} from "react";
import { Row, Col, Form, Modal, Card } from 'react-bootstrap';
import { getCountries } from '../../../Extra/Countries';
import 'react-datepicker/dist/react-datepicker.css';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {Button, TextField} from '@material-ui/core'
import '../../../../../static/css/index.css'
import { createAddress } from "../CompanyUtils";

const CreateAddress = ({onHide}) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [address, setAddress] = useState({country: "",city: "",street:""})
    useEffect(() => { getCountries(countries, setCountries)}, []);

    useEffect(() => {
        if(address?.country){
            const selectedCountry = countries.find((c) => c.country === address?.country);
            if(selectedCountry){
                setCities(selectedCountry.cities);
                setAddress(prevAddress => ({
                    ...prevAddress,
                    city: selectedCountry.cities.includes(address?.city) ? address?.city : selectedCountry.cities[0],
                    street: address?.street || 'No street added'
                }));
            }
        }
    }, [address.country, countries, address.city]);

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setAddress({...address,[name]: value,});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createAddress( address, setErrors)
    }

    return(<>
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <FormControl className="textfield">
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Country
                    </InputLabel>
                    <NativeSelect name='country' defaultValue={address?.country} value={address?.country} onChange={handleAddressChange} required>
                    {countries ? (
                        <>
                        <option value="" disabled></option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.country}>
                                {country.country}
                            </option>
                        ))}
                        </>
                    ) : (<option value="">Loading countries...</option>)}
                    </NativeSelect>
                </FormControl>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <FormControl className="textfield">
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            City
                        </InputLabel>
                        <NativeSelect name='city' defaultValue={address?.city} value={address?.city} onChange={handleAddressChange} required>
                    {cities ? (
                        cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))
                    ) : (<option value="">Loading cities...</option>)}
                        </NativeSelect>
                    </FormControl>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <TextField variant="standard" className="textfield" required
                        placeholder="Enter company's street" name="street"
                        label="Street" multiline 
                        value={address.street}
                        onChange={handleAddressChange}
                        id="outlined-basic"
                    />
                </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>)
}

export default CreateAddress