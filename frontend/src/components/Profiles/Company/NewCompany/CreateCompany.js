import React, {useState, useEffect, useRef} from "react";
import { Row, Col,Form,Modal,Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from "../../../../store/AuthContext";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createCompany } from "../CompanyUtils";
import { TextField} from '@material-ui/core'
import '../../../../../static/css/index.css'
// import ButtonGroup from '@material-ui/core/ButtonGroup';

import Button from '@mui/material/Button';

const CreateCompany = ({onHide}) => {
    const { user, updateUser } = useAuth()

    const today = new Date()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());

    const [selectedDate, setSelectedDate] = useState();
    const handleDateChange = (date) => setSelectedDate(new Date(date));
    
    const [formData, setFormData] = useState({ company_name: '',  description: '', phone: ''});
    const [errors, setErrors] = useState({company_name:"", establishment_date:"", description:"", image:"", phone:""})

    const fileInputRef = useRef(null);
    const handleButtonClick = () => fileInputRef.current.click()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };

    const [image, setImage] = useState('');
    const handleImageChange = (event) => {
        if( event.target.files[0]){
            setImage(event.target.files[0])
        }        
    };

    const handleSubmit = async (e) => {
        e && e.preventDefault()
        setErrors({company_name:"", establishment_date:"", description:"", image:"", phone: ''});
        
        if(selectedDate){
            const date = new Date(selectedDate).toISOString().split('T')[0];
            const data = { ...formData, establishment_date:date}
            createCompany( user.id, data, image, setErrors)
            .then(res => {
                updateUser({...user, 'company': res.data.company_info,'work_id': res.work.work_id,'is_admin': res.work.is_admin})
                // if(next && res.status === 200)setForm(1)
            })
            .catch(error => console.error(error));
        }else{
            setErrors({establishment_date:'Please enter establishment date'})
            return
        }
    }

    return(<>
        <Form className='form' onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Group as={Col} className="mb-3">
                    <TextField value={formData.company_name} onChange={handleInputChange} 
                        id={`outlined-${errors.company_name ? 'error' : 'basic'}`} error={errors?.company_name} helperText={errors?.company_name}
                        type='text' name='company_name'
                        label="Company Name" placeholder="Enter your company Name"
                        multiline required
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <p style={{ textAlign:'left'}} className="textfield">Started</p>
                    <DatePicker name="started" selected={selectedDate} onChange={handleDateChange}
                        id={`outlined-${errors.establishment_date ? 'error' : 'basic'}`} error={errors?.establishment_date} helperText={errors?.establishment_date}
                        dateFormat="yyyy-MM-dd" minDate={minDate} maxDate={today} required
                        isClearable={true} showYearDropdown={true} scrollableYearDropdown={true}
                    />
                </Form.Group>
            </Form.Group>

            <TextField required value={formData.description} onChange={handleInputChange}
                id={`outlined-${errors.description ? 'error' : 'basic'}`} error={errors?.description} helperText={errors?.description}
                type='text' name='description' label="Description" placeholder="Enter your company Description"
                multiline fullWidth 
            />
            
            <Form.Group as={Row} className="mb-3 mt-3" controlId="country">
                <Form.Group as={Col} className="mb-3" controlId="country">
                    <TextField className="textfield" label="Image" variant="standard"
                        id={`outlined-${errors.image ? 'error' : 'basic'}`} error={errors?.image} helperText={errors?.image}
                        placeholder="Insert image"  onClick={handleButtonClick}
                        value={image?.name || 'None'} fullWidth
                        InputProps={{startAdornment: <CloudUploadIcon/>,readOnly: true,}}   
                    />
                    <Form.Control ref={fileInputRef}
                        className="file-input" type="file" accept="image/*"
                        onChange={handleImageChange} style={{ display: 'none', width: '95%' }}
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="phone">
                    <TextField value={formData.phone} onChange={handleInputChange} 
                        id={`outlined-${errors.phone ? 'error' : 'basic'}`} error={errors?.phone} helperText={errors?.phone}
                        type='text' name='phone' required
                        label="Phone" placeholder="Enter your Phone"
                    />
                </Form.Group>
            </Form.Group>

                {/* <ButtonGroup> */}
                    <Button variant="contained" color="success" type="submit">Complete</Button>
                    {/* <Button variant="secondary" color="primary" type="submit" onClick={() => setNext(true)}>Continue</Button> */}
                {/* </ButtonGroup> */}

        </Form> 
    </>)
}

export default CreateCompany