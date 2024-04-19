import React, {useState, useEffect} from 'react';
import {Card, Row,Col} from 'react-bootstrap';
import { getUniversity, postUniversity } from '../UserUtils'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';

const University = ({user, university, admin}) => {   
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
        // const updatedData = data.map(uni => {
        //     if ( uni.id === universityId && String(uni.id).startsWith('_') ) {
        //         console.log("DELETE NEW")
        //         return null;
        //     } else if ( uni.id === universityId && startsWithInteger(parseInt(uni.id[0]))) {
        //         console.log("DELETE OLD")
        //         return { ...uni, id: 'X' + uni.id.slice(1) };
        //     }
        //     return uni;
        // }).filter(Boolean);
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

    const handleSave = (e) => {
        e.preventDefault()
        // const date = new Date(selectedDate).toISOString().split('T')[0];

        const updatedData = data.map(item => {
            const updatedItem = { ...item }; 
            updatedItem.graduation = new Date(updatedItem.graduation).toISOString().split('T')[0];
            return updatedItem; 
        });

        postUniversity( user, updatedData, setEdit)
        return
    }
    
    return(<>
        <Form className='form' onSubmit={handleSave}>
            <Card>
                <Card.Header>University</Card.Header>
                <Card.Body>
                    {
                        data ? (
                            data.map(uni => (
                                <div key={uni.id}>
                                    <TextField disabled={!editMode} variant="standard"
                                        placeholder="Enter University Name" name="name"
                                        label="University Name" required multiline fullWidth 
                                        value={uni?.name} onChange={(e) => handleInputChange(e, uni?.id)}
                                        style={{ margin: '1em', width: '95%', maxHeight: '15em', overflow: 'auto' }}    
                                    />

                                    {/* <Row><h4>Graduation: </h4> 
                                    { editMode ? (
                                        <DatePicker name="graduation" required disabled={!editMode} 
                                            selected={uni?.graduation} onChange={(e) => handleInputChange(e, uni?.id)}
                                            dateFormat="yyyy-MM-dd"
                                            minDate={minDate} maxDate={today}
                                            isClearable ={true}
                                            showYearDropdown={true} scrollableYearDropdown={true}
                                        />
                                        ) : (<>{new Date(uni?.graduation).toISOString().split('T')[0]}</>)
                                    }
                                    </Row> */}

                                    <TextField label="Graduation Date" variant="standard" disabled={!editMode}
                                        placeholder="Insert your graduation date"
                                        InputProps={{readOnly: true,}} value={ 'None'} 
                                        style={{ margin: '1em', width: '95%', maxHeight: '15em', overflow: 'auto' }}
                                    />
                                    <DatePicker name="graduation" required disabled={!editMode} 
                                        selected={uni?.graduation} onChange={(e) => handleInputChange(e, uni?.id)}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={minDate} maxDate={today}
                                        isClearable ={true}
                                        showYearDropdown={true} scrollableYearDropdown={true}
                                    />

                                    <TextField disabled={!editMode} variant="standard"
                                        placeholder="Enter your graduation degree" name="degree"
                                        label="Degree" required multiline fullWidth 
                                        value={uni?.degree} onChange={(e) => handleInputChange(e, uni?.id)}
                                        style={{ margin: '1em', width: '95%', maxHeight: '15em', overflow: 'auto' }}    
                                    />
                                    { editMode && 
                                        <div className='center-button'>
                                            <Button variant="secondary" color="error" onClick={() => handleRemoveUniversity(uni.id)}>
                                                Remove
                                            </Button>
                                        </div>
                                    }
                                    <hr />              
                                </div>
                            ))
                        ) : (
                            !data && <div>No university information available</div>
                        )
                        }
                        { editMode && 
                            <div className='center-button'>
                                <Button variant="outline-secondary" onClick={addUniversity}>Add University</Button>
                            </div>
                        }
                </Card.Body>
                <Card.Footer className="text-muted">
                    {
                        editMode ? (
                            <div className='center-button'>
                            <Button variant="contained" color="success" type="submit" disabled ={!editMode}>
                                Save
                            </Button>     
                            </div>
                        ) : (
                            admin && 
                            <div className='center-button'>
                            <Button variant="secondary" onClick={handleEdit}>Edit</Button>
                            </div>
                        )
                    }
                </Card.Footer>     
            </Card>  
        </Form>
    </>)
}

export default University;