import React, { useState} from "react";
import {Modal,Button, Form,Dropdown,Row,Col } from "react-bootstrap"
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Range from '../Range'
import { addProject } from "./ProjectUtils";
import {TextField} from '@material-ui/core';
import { useAuth } from "../../../store/AuthContext"; 

import { Grid } from '@material-ui/core';
import { DatePicker } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import Popover from '@material-ui/core/Popover';
import { DateRangePicker } from 'react-date-range';

import "react-datepicker/dist/react-datepicker.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const NewProject = (props) => {
    const { user} = useAuth();
    const today = new Date()
    const [project, setProject] = useState(null)
    const [projectError, setProjectError] = useState()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
    const [formData, setFormData] = useState({ 
        title: '',  description: ''
    });


    // const [startDate, setStartDate] = useState();
    // const handleStartDateChange = (date) => setStartDate(date);

    // const [finishDate, setFinishDate] = useState();
    // const handleFinishDateChange = (date) => setFinishDate(date);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };    

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? 'date-range-popover' : undefined;

    const handleSubmit = async(e) => {
        e.preventDefault()
        setProjectError(null);

        const { startDate, endDate } = dateRange[0];
        const start_date1  = new Date(startDate).toISOString().split('T')[0];
        const finish_date1 = new Date(endDate).toISOString().split('T')[0];

        const adjustedStartDate = new Date(start_date1);
        adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
        const start_date = adjustedStartDate.toISOString().split('T')[0];

        const adjustedEndDate = new Date(finish_date1);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        const finish_date = adjustedEndDate.toISOString().split('T')[0];

        if(start_date < finish_date){
            const data = { ...formData, company:props.company, phase:"I", start_date, finish_date}
            console.log(data)
            addProject( data, props.onHide, props.setNewProject, user.work_id, setProjectError, setProject, setFormData)
        }else{
            setProjectError("Start date must be before finish date...")
        }
    }
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [dateRangeString, setDateRangeString] = useState('');

    const handleDateChange = (ranges) => {
        setDateRange([ranges.selection]);
        const startDateString = ranges.selection.startDate.toLocaleDateString();
        const endDateString = ranges.selection.endDate.toLocaleDateString();
        const rangeString = `${startDateString} - ${endDateString}`;
        setDateRangeString(rangeString);
    };

    return (
        <Modal {...props} size="lg" centered
            aria-labelledby="contained-modal-title-vcenter"   
        >
            <Form className='form' onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                <TextField 
                    id="outlined-basic" label="Title"  variant="standard" 
                    placeholder="Enter a project title" name="title"
                    value={formData.title} required 
                    multiline fullWidth  style={{ margin: '1em' }}       
                    onChange={handleInputChange}
                />

                <TextField 
                    id="outlined-basic" label="Description"  variant="standard" 
                    placeholder="Enter a project description" name="description"
                    value={formData.description} required 
                    multiline fullWidth  style={{ margin: '1em' }}       
                    onChange={handleInputChange}
                />
  
{/* 
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Start Date" variant="outlined"
                            required type="date" value={startDate}
                            onChange={(e) => handleStartDateChange(e.target.value)}
                            InputLabelProps={{shrink: true,}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Finish Date" variant="outlined"
                            required type="date" value={finishDate}
                            onChange={(e) => handleFinishDateChange(e.target.value)}
                            InputLabelProps={{shrink: true,}}
                        />
                    </Grid>
                </Grid> */}

        <div>
            <TextField
                id="outlined-basic"
                label="Duration"
                variant="standard"
                placeholder="Insert project duration"
                value={dateRangeString}
                onClick={handleClick}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Popover id={id} open={open} anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
                transformOrigin={{vertical: 'top',horizontal: 'center',}}
            >
                <DateRangePicker
                    minDate={today}
                    ranges={dateRange}
                    onChange={handleDateChange}
                />
            </Popover>
        </div>
{/*                 
                    <Form.Group as={Col} className="mb-3" controlId="Started">
                    <Form.Label>Start Date</Form.Label>
                        <DatePicker  required
                            selected={startDate} onChange={handleStartDateChange}
                            dateFormat="yyyy-MM-dd" minDate={today} isClearable ={true}
                            showYearDropdown={true} scrollableYearDropdown={true}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="Started">
                    <Form.Label>Finish Date</Form.Label>
                        <DatePicker  required
                            selected={finishDate} onChange={handleFinishDateChange}
                            dateFormat="yyyy-MM-dd" minDate={today} isClearable ={true}
                            showYearDropdown={true} scrollableYearDropdown={true}
                        />
                    </Form.Group> */}
                    {projectError && <span className="text-danger">{projectError}</span>}
                {/* </Row> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit">
                    Create
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
};


export default NewProject