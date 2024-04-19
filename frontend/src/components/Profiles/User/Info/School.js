import React, { useState, useEffect } from 'react';
import {Card, Row,Col} from 'react-bootstrap';
import { editEducation, postEducation } from '../UserUtils'
import Form from 'react-bootstrap/Form';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../../../static/css/Profile/Forms.css';
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import Popover from '@material-ui/core/Popover';

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

    // const [anchorEl, setAnchorEl] = useState(null);
    // const handleClick = (event) => setAnchorEl(event.currentTarget);
    // const handleClose = () => setAnchorEl(null);
    // const open = Boolean(anchorEl);
    // const id = open ? 'date-range-popover' : undefined;

    const handleNameChange = (event) => setSelectedName(event.target.value);
    const handleDateChange = (date) => setSelectedDate(new Date(date));

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const handleSave = (e) => {
        e.preventDefault()
        const date = new Date(selectedDate).toISOString().split('T')[0];
        const data = {
            ...(education?.id ? { id: education.id } : {}), 
            user: user,
            name: selectedName,
            graduation: date
        };
        console.log(data)
        if(data.id){
            editEducation( data, setEdit)
        }else{
            postEducation( data, setEdit)
        }
        return
    }

    return (
        <>
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
                                    style={{ margin: '1em', width: '95%', maxHeight: '15em', overflow: 'auto' }}    
                                />
                                {/* <Row>
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
                                </Row> */}



                            {/* <TextField label="Graduation Date" variant="standard" disabled={!editMode}
                                placeholder="Enter your graduation date" required multiline fullWidth
                                value={selectedDate?.toLocaleDateString() || 'None'}
                                onClick={handleClick} InputProps={{readOnly: true,}}
                                style={{ margin: '1em', width: '95%', maxHeight: '15em', overflow: 'auto' }}
                            />

                            <Popover id={id} open={open} anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
                                transformOrigin={{vertical: 'top',horizontal: 'center',}}
                            > */}
                                <TextField label="Graduation Date" variant="standard" disabled={!editMode}
                                    placeholder="Inser your graduation date"
                                    InputProps={{readOnly: true,}}
                                    style={{ margin: '1em', width: '95%', maxHeight: '15em', overflow: 'auto' }}
                                />
                                <DatePicker  required disabled={!editMode}
                                    selected={selectedDate} onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={minDate} maxDate={today}
                                    isClearable ={true}
                                    showYearDropdown={true} scrollableYearDropdown={true}
                                />

                            {/* </Popover> */}
                            </>
                        ) : (
                            <div>No education information available</div>
                        )}
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
        </>
    );
}

export default School;