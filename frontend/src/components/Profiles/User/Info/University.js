import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Card, Row,Col} from 'react-bootstrap';
import { getUniversity, postUniversity } from '../UserUtils'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';


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

    // const startsWithInteger = (variable) => {
    //     return /^\d/.test(variable);
    // };

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
            const updatedItem = { ...item }; // Create a copy of the original object
            updatedItem.graduation = new Date(updatedItem.graduation).toISOString().split('T')[0]; // Update the graduation date
            return updatedItem; // Return the updated object
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
                                    <Row><h4>University: </h4> 
                                    { editMode ? (
                                        <Form.Control name="name" type="text"  disabled={!editMode}
                                            placeholder="Enter your university name" 
                                            value={uni?.name} onChange={(e) => handleInputChange(e, uni?.id)}
                                        />
                                        ) : (<>{uni?.name}</>)  
                                    }
                                    </Row>
                                    <Row><h4>Graduation: </h4> 
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
                                    </Row>
                                    <Row><h4>Degree: </h4> 
                                    { editMode ? (
                                        <Form.Control name="degree" type="text"  disabled={!editMode}
                                            placeholder="Enter your graduation degree" 
                                            value={uni?.degree} onChange={(e) => handleInputChange(e, uni?.id)}
                                        />
                                        ) : (<>{uni?.degree}</>)  
                                    }
                                    </Row>
                                    { editMode && <Button variant="danger" onClick={() => handleRemoveUniversity(uni.id)}>Remove</Button>}
                                    <hr />              
                                </div>
                            ))
                        ) : (
                            !data && <div>No university information available</div>
                        )
                        }
                        { editMode && <Button variant="outline-secondary" onClick={addUniversity}>Add University</Button>}
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
    </>)
}

export default University;