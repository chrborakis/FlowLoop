import React, {useState, useEffect, useRef} from 'react';
import {Card, Row,Col} from 'react-bootstrap';
import { getUniversity, postUniversity } from '../UserUtils'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import AlertMessage from '../../../Extra/AlertMessage';

import '../../../../../static/css/index.css'

const University = ({user, university, admin, token}) => {   
    const [editMode, setEdit] = useState(false);
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());

    const [ data, setData] = useState([])

    useEffect( ()=>{
        setData(university)
    },[university])

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const addUniversity = () => {
        const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
        const newUniversity = {
            id: "_" + newId,
            user: user,
            name: "",
            graduation: "",
            degree: ""
        };
        console.log(newUniversity)
        setData([...data, newUniversity]);
    }

    const handleRemoveUniversity = (universityId) => {
        const updatedData = data.filter(uni => uni.id !== universityId);
        setData(updatedData);
    };

    const handleInputChange = (event, uniId) => {
        const { name, value } = event?.target || {};
        if (name) {
            setData(data.map(uni => uni.id === uniId ? {...uni, [name]: value} : uni));
        } else {
            const date = format(event, 'yyyy-MM-dd')
            setData(data.map(uni => uni.id === uniId ? {...uni, ['graduation']: date} : uni));
        }
    };

    const [alert, setAlert] = useState({
        state:'', info:'', text:''
    })

    const handleSave = (e) => {
        e.preventDefault()
        const updatedData = data.map(item => {
            const updatedItem = { ...item }; 
            updatedItem.graduation = new Date(updatedItem.graduation).toISOString().split('T')[0];
            return updatedItem; 
        });

        postUniversity( user, updatedData, setEdit, setAlert, token)
        return
    }
    
    return(<>
        <Form className='form' onSubmit={handleSave}>
            <Card>
                <Card.Header>University</Card.Header>
                <Card.Body>
                    {
                        data?.length > 0 ? (
                            data.map(uni => (
                                <Card key={uni.id} style={{ width: '95%' }}>
                                    <TextField disabled={!editMode} variant="standard"
                                        placeholder="Enter University Name" name="name"
                                        label="University Name" required multiline fullWidth 
                                        value={uni?.name} onChange={(e) => handleInputChange(e, uni?.id)}
                                        className='textfield' 
                                    />

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', margin: '1em 0' }}>
                                        {editMode ? (
                                            <>
                                            <p style={{ margin: 0 }}>Graduation</p>
                                            <DatePicker name="graduation" required disabled={!editMode}
                                                selected={uni?.graduation} onChange={(e) => handleInputChange(e, uni?.id)}
                                                dateFormat="yyyy-MM-dd" minDate={minDate} maxDate={today} isClearable={true} showYearDropdown={true} scrollableYearDropdown={true}
                                                />
                                            </>
                                        ) : (
                                            <TextField label="Graduation Date" variant="standard" disabled={!editMode}
                                                InputProps={{ readOnly: true }} className='textfield'
                                                value={uni?.graduation ? uni?.graduation : 'None'} style={{ margin: 0 }}
                                            />
                                        )}
                                    </div>

                                    <TextField disabled={!editMode} variant="standard"
                                        placeholder="Enter your graduation degree" name="degree"
                                        label="Degree" required multiline fullWidth 
                                        value={uni?.degree} onChange={(e) => handleInputChange(e, uni?.id)}
                                        className='textfield'    
                                    />
                                    { editMode && 
                                        <Card.Footer className='center-button'>
                                            <Button variant="outlined" color="error" onClick={() => handleRemoveUniversity(uni.id)}>
                                                Remove
                                            </Button>
                                        </Card.Footer>
                                    }             
                                </Card>
                            ))
                        ) : (
                            <div>No university information available</div>
                        )
                        }
                        { editMode && 
                            <div className='center-button'>
                                <Button variant="outline-secondary" onClick={addUniversity}>Add University</Button>
                            </div>
                        }
                        
                        { alert && <AlertMessage alert={alert}/>}

                </Card.Body>
                <Card.Footer className="text-muted">
                    {
                        editMode ? (
                            <Button style={{background:'#388E3C', color:'white'}} type="submit" disabled ={!editMode}>
                                Save
                            </Button>     
                        ) : (
                            admin && <Button variant="secondary" onClick={handleEdit}>Edit</Button>
                        )
                    }
                </Card.Footer>     
            </Card>  
        </Form>
    </>)
}

export default University;