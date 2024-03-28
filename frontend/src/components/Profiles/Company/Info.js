import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Card,Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateCompany } from './CompanyUtils';

const Info = ({company, admin}) => {
    const [editMode, setEdit] = useState(false);

    const [data, setData] = useState({ 
        description: company.description,
        phone:       company.phone,
    });

    const today = new Date()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
    const [selectedDate, setSelectedDate] = useState(company.establishment_date);
    const handleDateChange = (date) => setSelectedDate(new Date(date));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({...data,[name]: value,});
    };
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }
    const [errors, setError] = useState()
    const handleSave = async(e) => {
        e.preventDefault();
        setError({phone:""})
        
        const _data = {...data, 
            description: data.description,
            phone: data.phone.startsWith('+') ? data.phone : '+' + data.phone,
            establishment_date: new Date(selectedDate).toISOString().split('T')[0]
        }
        console.log("DATA",_data)
        updateCompany( company.slug, _data, setEdit, setError)        
    }

    return(<>   
        <Form className='form' onSubmit={handleSave}>
            <Card className="text-center">  
                <Card.Header>Company Information</Card.Header>
                <Card.Body>
                    <Form.Group as={Col} className="mb-3" controlId="about">
                        <Form.Label>About</Form.Label>
                        <Form.Control name="description" type="text" as="textarea" rows={3}  disabled={!editMode}
                            placeholder="Enter your Description" 
                            value={data.description} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="Started">
                        <Form.Label>Started</Form.Label>
                            {editMode ? (
                                <DatePicker  required disabled={!editMode}
                                    selected={selectedDate} onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={minDate} maxDate={today}
                                    isClearable ={true}
                                    showYearDropdown={true} scrollableYearDropdown={true}
                                />
                            ) : (
                            <Form.Control disabled={!editMode} name="started" type="text" placeholder=""
                                value={new Date(selectedDate).toISOString().split('T')[0]} onChange={handleInputChange} required/>
                            )}
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control  disabled={!editMode}
                            name="phone" type="text"
                            placeholder="Enter Company Phone"
                            value={data.phone} onChange={handleInputChange} required
                        />
                        {errors?.phone && <span className="text-danger">{errors?.phone}</span>}
                    </Form.Group>

                </Card.Body>
                <Card.Footer className="text-muted">
                    {
                        editMode ? (
                            <Button variant="primary" type="submit" disabled ={!editMode}>
                                Save
                            </Button>   
                        ) : (
                            admin && <Button variant="outline-secondary" onClick={handleEdit}>Edit</Button>
                        )
                    }

                </Card.Footer>
            </Card>
        </Form>
    </>);
}

export default Info;


