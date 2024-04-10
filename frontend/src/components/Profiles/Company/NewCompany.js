import React, {useState, useEffect} from "react";
import { Row, Col,Form,Button,Modal,Card } from 'react-bootstrap';
import { getCountries } from '../../Extra/Countries';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createCompany } from "./CompanyUtils";
import { useAuth } from '../../../store/AuthContext';

const NewCompany = (props) => {
    const { user, updateUser } = useAuth()
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const today = new Date()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());

    const [selectedDate, setSelectedDate] = useState();
    const handleDateChange = (date) => setSelectedDate(new Date(date));
    
    const [address, setAddress] = useState({
        country: "",
        city: "",
        street:""
    })
    const [formData, setFormData] = useState({ 
        company_name: '',  description: '', phone: '',    
    });

    const [errors, setError] = useState()

    useEffect(() => { 
        getCountries(countries, setCountries)
        if(countries)
            setAddress(prevAddress => ({...prevAddress,
                country: countries[0]
            }));
    }, []);

    useEffect(() => {
        if(address.country){
            const Cities = countries.find((c) => c.country === address.country);
            setCities(Cities.cities);
            setAddress(prevAddress => ({...prevAddress,
                city: Cities.cities[0]
            }));
        }
    }, [address.country])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };
    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setAddress({...address,[name]: value,});
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setFormData({
            ...formData,
            image: imageFile
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);
        const date = new Date(selectedDate).toISOString().split('T')[0];
        const data = { ...formData, date}

        console.log(data)
        console.log(address)
        
        createCompany( user.id, data, address, setError, props.onHide)
        .then(res => {
            console.log(res.data)
            updateUser({
                    ...user, 
                    'company': res.data.company_info,
                    'work_id': res.data.id,
                    'is_admin': res.data.is_admin
                })
            props.onHide();
        })
        .catch(error => console.error(error));
    }


    return(<>
        <Modal {...props} size="lg" centered
            aria-labelledby="contained-modal-title-vcenter"   
        >
            <Form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Start your company!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="company_name">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control name="company_name" type="text" 
                            placeholder="Insert your company name" 
                            value={formData.company_name} onChange={handleInputChange} required  
                        />
                            {errors?.company_name && <span className="text-danger">{errors?.company_name}</span>}
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="Started">
                    <Form.Label>Started</Form.Label>
                        <DatePicker  required
                            selected={selectedDate} onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            minDate={minDate} maxDate={today}
                            isClearable ={true}
                            showYearDropdown={true} scrollableYearDropdown={true}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" type="text" as="textarea" rows={3} 
                            placeholder="Enter your Description" 
                            value={formData.description} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className='mb-3' controlId='formImage'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" accept="image/*"
                            onChange={handleImageChange} 
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            name="phone" type="text"
                            placeholder="Enter Company Phone"
                            value={formData.phone} onChange={handleInputChange} required
                        />
                        {errors?.phone && <span className="text-danger">{errors?.phone}</span>}
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        {countries ? (
                            <Form.Control as="select" name="country" value={address.country} onChange={handleAddressChange} required>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.country}>
                                        {country.country}
                                    </option>
                                ))}
                            </Form.Control>
                        ) : (
                            <Form.Control name="country" type="text"
                                placeholder="Enter Country"
                                value={address.country} onChange={handleAddressChange} required
                            />
                        )}
                        {errors?.country && <span className="text-danger">{errors?.country}</span>}
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        {cities.length > 0 ? (
                            <Form.Control as="select" name="city" value={address.city} onChange={handleAddressChange} required>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </Form.Control>
                        ) : (
                            <Form.Control name="city" type="text"
                                placeholder="Enter City"
                                value={address.city} onChange={handleAddressChange} required
                            />
                        )}
                        {errors?.city && <span className="text-danger">{errors?.city}</span>}
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control name="street" type="text" 
                            placeholder="Insert street..." 
                            value={address.street} onChange={handleAddressChange} required  
                        />
                        {errors?.street && <span className="text-danger">{errors?.street}</span>}
                    </Form.Group>
                </Row>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Modal.Footer>
        </Form>
        </Modal>       
    </>)
}

export default NewCompany;