import React, { useState, useRef, useEffect } from 'react';
import {Card, Row,Col} from 'react-bootstrap';
import { editEducation, postEducation } from '../UserUtils'
import Form from 'react-bootstrap/Form';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../../../static/css/Profile/Forms.css';
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import AlertMessage from '../../../Extra/AlertMessage';

import '../../../../../static/css/index.css'

const School = ({ user, education, admin}) => {
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
    
    const [alert, setAlert] = useState({state:'', info:'', text:''})
    
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }
    const handleSave = (e) => {
        e.preventDefault()
        
        
        const updatedData = {
            ...(education?.id ? { id: education.id } : {}), 
            user: user,
            name: selectedName,
            graduation: new Date(selectedDate).toISOString().split('T')[0]
        }

        console.group("Dates")
        console.log(selectedDate)
        console.log(updatedData.graduation)
        console.groupEnd()

        if(updatedData.id){
            editEducation( updatedData, setEdit, setAlert)
        }else{
            postEducation( updatedData, setEdit, setAlert)
        }
        return
    }

    return (<>
        <Form className='form' onSubmit={handleSave}>
            <Card>
                <Card.Header>Education</Card.Header>
                <Card.Body>
                    {selectedName || editMode? (
                        <>
                            <TextField disabled={!editMode} variant="standard"
                                placeholder="Enter your School Name" name="school_name"
                                label="School Name" required multiline fullWidth 
                                value={selectedName} onChange={handleNameChange}
                                className="textfield" 
                            />

                            { editMode ? (<>
                                <p style={{ textAlign:'left'}} className="textfield">Graduation</p>
                                <DatePicker name="graduation"  required 
                                    disabled={!editMode} selected={selectedDate} onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd" minDate={minDate} maxDate={today} 
                                    isClearable={true} showYearDropdown={true} scrollableYearDropdown={true}
                                />
                                    </>
                                ) : (<>
                                <TextField  label="Graduation Date" variant="standard" 
                                    disabled={!editMode} InputProps={{ readOnly: true }}
                                    className="textfield" value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : 'None'}
                                />
                                </>)
                            }
                        </>
                    ) : (
                        <div>No education information available</div>
                    )}
                    { alert && <AlertMessage alert={alert}/>}
                </Card.Body>
                <Card.Footer className="text-muted">
                    {editMode ? (
                        <Button style={{background:'#388E3C', color:'white'}} type="submit" disabled ={!editMode}>
                            Save
                        </Button>   
                    ) : (admin && <Button variant="secondary" onClick={handleEdit}>Edit</Button>)}
                </Card.Footer>
            </Card>
        </Form>
    </>);
}

export default School;