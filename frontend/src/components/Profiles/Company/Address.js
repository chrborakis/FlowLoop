import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Card,Col} from 'react-bootstrap';

import { getAddress, updateAddress } from './CompanyUtils';
import { getCountries } from '../../Extra/Countries';


const Address = ({address, admin}) => {
    const [data, setData] = useState({ 
        country: address?.country,
        city:    address?.city,
        street:  address?.street,
    });

    const [editMode, setEdit] = useState(false);

    const [error,setError] = useState("")
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => { 
        getCountries(countries, setCountries)
    }, []);

    useEffect(() => {
        if(data.country){
            const Cities = countries.find((c) => c.country === data.country);
            if(Cities){
                setCities(Cities.cities);
                setData(prevAddress => ({...prevAddress,
                    city: Cities.cities[0],
                    street: ""
                }));
            }
        }
    }, [data.country])

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
        setError("");
        console.log(data)
        updateAddress( address.id, data, setEdit, setError)
    }
    return(<>  
        <Form className='form' onSubmit={handleSave}>
            <Card className="text-center">  
                <Card.Header>Company Address</Card.Header>
                <Card.Body>        
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
                    <Form.Group as={Col} className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        {cities.length > 0 ? (
                            <Form.Control as="select" name="city" value={data.city} onChange={handleInputChange} required disabled={!editMode}>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </Form.Control>
                        ) : (
                            <Form.Control name="city" type="text"
                                placeholder="Enter City"
                                value={data.city} onChange={handleInputChange} required disabled={!editMode}
                            />
                        )}
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control name="street" type="text"  disabled={!editMode}
                            placeholder="Insert street..." 
                            value={data.street} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                    {error && <span className="text-danger">{error}</span>}
                </Card.Body>
                <Card.Footer className="text-muted">
                    {
                        editMode ? (
                            <Button variant="primary" type="submit" disabled ={!editMode}>
                                Save
                            </Button>   
                        ) : (
                            
                            admin && <Button variant="outline-secondary" type="button" onClick={handleEdit}>Edit</Button>
                        )
                    }

                </Card.Footer>
            </Card>
        </Form>
    </>);
}

export default Address;


