import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Card,Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateCompany } from '../CompanyUtils';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useAuth } from '../../../../store/AuthContext';

const Info = ({company, admin}) => {
    const [editMode, setEdit] = useState(false);
    const { user, updateUser } = useAuth();

    const [data, setData] = useState({ 
        company_name: company.company_name,
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
            company_name: data.company_name,
            description: data.description,
            phone: data.phone.startsWith('+') ? data.phone : '+' + data.phone,
            establishment_date: new Date(selectedDate).toISOString().split('T')[0]
        }
        console.log("DATA",_data)

        axios.patch(`../backend/api/companies/${company.slug}`, _data
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }).
        then( res => {
            if(res.status === 200) {
                setEdit(false);
                const companyToSlug = (str) => str.trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
                const new_slug = companyToSlug(data.company_name)
                console.log(new_slug)
                if(company.slug != new_slug){
                    history.pushState(null, null, `/company/${new_slug}`);
                    updateUser({...user,company: {...user.company,name: data.company_name,slug: new_slug}});
                }
            }
        }).
        catch( err => {
            console.log(err)
            if(err.response.data.phone[0]) setError(prevState => ({...prevState,phone: err.response.data.phone}))
        }) 
    }

    return(<>   
        <Form className='form' onSubmit={handleSave}>
            <Card className="text-center">  
                <Card.Header>Company Information</Card.Header>
                <Card.Body>
                    {editMode &&
                        <Form.Group as={Col} className="mb-3" controlId="name">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control name="company_name" type="text" 
                                placeholder="Enter Company Name" 
                                value={data.company_name} onChange={handleInputChange} required  
                            />
                        </Form.Group>
                    }
                    <Form.Group as={Col} className="mb-3" controlId="about">
                        <Form.Label>About</Form.Label>
                        <Form.Control name="description" type="text" as="textarea" rows={3}  disabled={!editMode}
                            placeholder="Enter company Description" 
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


