import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Card, Row,Col} from 'react-bootstrap';
import { getUniversity, getEducation, postEducation } from '../UserUtils'
import Form from 'react-bootstrap/Form';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../../../static/css/Profile/Forms.css';

import { format } from 'date-fns';

const School = ({education, admin}) => {
    const [editMode, setEdit] = useState(false);
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());

    const [selectedName, setSelectedName] = useState("");
    const [selectedDate, setSelectedDate] = useState();

    useEffect(() => {
        setSelectedName(education?.name);
        setSelectedDate(education?.graduation);
    }, [education]);

    const handleNameChange = (event) => setSelectedName(event.target.value);
    const handleDateChange = (date) => setSelectedDate(new Date(date));

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const handleSave = (e) => {
        e.preventDefault()
        const date = new Date(selectedDate).toISOString().split('T')[0];
        postEducation({id: education.id, name:selectedName, graduation:date}, setEdit)
        return
    }

    return (
        <>
            <Form className='form' onSubmit={handleSave}>
                <Card>
                    <Card.Header>Education</Card.Header>
                    <Card.Body>
                        {selectedName || editMode ? (
                            <>
                                <Row>
                                    <h4>Name: </h4> 
                                    {editMode ? (
                                        <Form.Control name="name" type="text"  disabled={!editMode} required
                                            placeholder="Enter your school name" 
                                            onChange={handleNameChange} value={selectedName} 
                                         />
                                    ) : (<>{selectedName}</>)}
                                </Row>
                                <Row>
                                    <h4>Graduation: </h4> 
                                    {editMode ? (
                                        <DatePicker  required disabled={!editMode}
                                            selected={selectedDate} onChange={handleDateChange}
                                            dateFormat="yyyy-MM-dd"
                                            minDate={minDate} maxDate={today}
                                            isClearable ={true}
                                            showYearDropdown={true} scrollableYearDropdown={true}
                                        />
                                    ) : (<>{new Date(selectedDate).toISOString().split('T')[0]}</>)}
                                </Row>
                            </>
                        ) : (
                            <div>No education information available</div>
                        )}
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        {editMode ? (
                            <div className='center-button'>
                                <Button variant="primary" type="submit" disabled={!editMode}>
                                    Save
                                </Button>   
                            </div>
                        ) : (
                            admin && 
                            <div className='center-button'>
                                <Button variant="outline-secondary" onClick={handleEdit}>Edit</Button>
                            </div>
                        )}
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}

export default School;




{/* <Form className='form' onSubmit={handleSave}>
            <Card className="text-center">  
                <Card.Header>User Education</Card.Header>
                <Card.Body>
                    <Form.Group as={Col} className="mb-3" controlId="name">
                        <Form.Label>School Name</Form.Label>
                        <Form.Control name="name" type="text"  disabled={!editMode}
                            placeholder="Enter your School Name" 
                            value={education?.name} onChange={handleInputChange} required  
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="graduation">
                        <Form.Label>Graduation</Form.Label>
                        <Form.Control name="graduation" type="text"  disabled={!editMode}
                            placeholder="Enter your school graduation" 
                            value={education?.graduation} onChange={handleInputChange}  
                        />
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
        </Form> */}