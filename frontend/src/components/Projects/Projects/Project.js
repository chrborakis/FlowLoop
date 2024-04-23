import React, {useState, useEffect, useRef} from "react";
import { Container, Col, Row, Card, Dropdown, Form} from 'react-bootstrap';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Badge from 'react-bootstrap/Badge';
import { deleteProject, updateProject} from "./ProjectUtils";
import { getDivisions } from "../Divisions/DivisionUtils";
import DivisionsList from "../Divisions/DivisionsList";
import { BsPlusLg } from "react-icons/bs";
import { useAuth } from '../../../store/AuthContext';
import NewDivision from "../Divisions/NewDivision";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import Range from "../Range";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { TextField } from "@material-ui/core";
import { User } from "../../Profiles/Profile";
import DateRange from "../../Extra/DateRange";
import '../../../../static/css/HomePage.css'
import '../../../../static/css/projects.css'
import 'primereact/resources/themes/saga-blue/theme.css'; // Change the theme accordingly
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import { setDate } from "date-fns";

import '../../../../static/css/index.css'

const Project = ({project, setProjects}) => {
    const [dateRange, setDateRange] = useState([{
        startDate: project?.start_date,
        endDate: project?.finish_date,
        key: 'selection'
    }]);
    
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(prevState => !prevState);

    const { user} = useAuth();
    const [phase, setPhase] = useState({ name: "", state: "" });
    const [divisions,setDivisions] = useState([])

    const [projectOpts, setProjectOpts] = useState(false);
    const toggleDropdown = () => setProjectOpts(!projectOpts);
    const [visible,setVisible] = useState(false)

    const [editMode, setEdit] = useState(false)

    const [data, setData] = useState({ 
        title:       project?.title,
        description: project?.description,
    });

    const [errors, setErrors] = useState({title:'', description:'', start_date:'', finish_date:''})

    const accept = () => {
        deleteProject(project.project_id, setProjects)
        setVisible(false)
    }
    const reject = () => setVisible(false);    

    const options = [
        { label: 'Initiating', value: 'Initiating', bgColor: 'secondary' },
        { label: 'Planning', value: 'Planning', bgColor: 'info' },
        { label: 'Executing', value: 'Executing', bgColor: 'warning' },
        { label: 'Closed', value: 'Closed', bgColor: 'success' }
      ];

    const handleSelect = (selectedState) => {
        const newState = selectedState.outerText
        const selectedOption = options.find(option => option.label === newState);
        if (selectedOption) {
            setPhase({ name: selectedOption.value, state: selectedOption.bgColor});
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(prevState => !prevState);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({...data,[name]: value,});
    };

    useEffect(()=>{
        getDivisions(project.project_id, setDivisions)
    },[project, setDivisions])

    useEffect(() => {
        switch (project.phase) {
            case 'I':setPhase({ name: 'Initiating', state: 'secondary' });
                break;
            case 'P':setPhase({ name: 'Planning', state: 'info' });
                break;
            case 'E':setPhase({ name: 'Executing', state: 'warning' });
                break;
            case 'C':setPhase({ name: 'Closed', state: 'success' });
                break;
            default:break;
        }
    }, [project.phase]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({title:'', description:'', dates:''})
        const { startDate, endDate } = dateRange[0];
        const start_date1  = new Date(startDate).toISOString().split('T')[0];
        const finish_date1 = new Date(endDate).toISOString().split('T')[0];

        const adjustedStartDate = new Date(start_date1);
        adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
        const start_date = adjustedStartDate.toISOString().split('T')[0];

        const adjustedEndDate = new Date(finish_date1);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        const finish_date = adjustedEndDate.toISOString().split('T')[0];

        setDateRange([{startDate:start_date, endDate:finish_date, key: "selection"}])

        const editedProject = {
            ...data,
            start_date: start_date,
            finish_date: finish_date,
            phase: phase.name[0]
        }
        console.log(editedProject)
        updateProject(project.project_id, editedProject, setEdit, setProjects, setErrors)
    }

    return(<>
        <Card className="card-content">
            <Card.Header>
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-start">
                        <User user={project.admin}/>
                    </Col>

                    <Col xs={4} className="d-flex justify-content-end">
                        {project?.admin?.slug === user.slug && 
                            <Dropdown show={projectOpts} onToggle={toggleDropdown}>
                                <Dropdown.Toggle variant="secondary"><HiMiniCog6Tooth /></Dropdown.Toggle>
                                <Dropdown.Menu >
                                <ButtonGroup orientation="vertical" className="w-100" aria-label="Vertical button group">
                                    <Button variant="outlined" color="primary" className="w-100" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error" className="w-100" icon="pi pi-check" label="Confirm" onClick={() => setVisible(true)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)}
                            message="Are you sure you want to delete this project?" header="Delete Project"
                            icon="pi pi-exclamation-triangle" accept={accept} reject={reject}
                        />
                    </Col>
                </Row>                       
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Card.Title>
                        <Row className="align-items-center">
                            {editMode ? (<>
                                <TextField 
                                    id="outlined-basic" label="Title"  variant="standard" 
                                    placeholder="Enter a project title" name="title"
                                    value={data.title} disabled={!editMode}
                                    multiline fullWidth  className="textfield"  
                                    onChange={handleInputChange}
                                />
                                { errors?.title && <span className="text-danger">{errors.title}</span>}
                            </>) : (<Col>{data.title}</Col>)}
                        </Row>

                        <Row className="align-items-center">
                            {editMode ? (
                                <Dropdown>
                                    <Dropdown.Toggle variant={phase.state} id="dropdown-basic">
                                        {phase.name}
                                    </Dropdown.Toggle>
                                
                                    <Dropdown.Menu>
                                        {options.map((option, index) => (
                                            <Dropdown.Item key={index} eventKey={option.value} className="textfield" 
                                                onClick={(ev)=>handleSelect(ev.target)} active={phase.state === option.value}
                                            >
                                                <Badge bg={option.bgColor}>{option.label}</Badge>
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (<Badge pill bg={phase.state}>{phase.name}</Badge>)}
                        </Row>

                    </Card.Title>
                    <Card.Text>
                        {editMode ? (<>
                            <TextField className="textfield" 
                                    id="outlined-basic" label="Description"  variant="standard" 
                                    placeholder="Enter a project description" name="description"
                                    value={data.description} disabled={!editMode}
                                    multiline fullWidth onChange={handleInputChange}
                                />
                                { errors?.description && <span className="text-danger">{errors.description}</span>}
                            </>) : (<>{data.description}</>)}
                        {editMode ? (<>
                            <DateRange dateRange={dateRange} setDateRange={setDateRange}/>
                            { errors?.start_date  && <span className="text-danger">{errors.start_date}</span>}
                            { errors?.finish_date && <span className="text-danger">{errors.finish_date}</span>}
                        </>) : (<p>{dateRange[0].startDate} - {dateRange[0].endDate}</p>)
                        }
                    </Card.Text>
                    {editMode ? (
                        <Button variant="contained" color="success" type="submit" disabled ={!editMode}>
                            Save
                        </Button>   
                    ) : (
                        <Button variant="plain" onClick={toggleExpand}>
                            {isExpanded ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
                        </Button>
                    )}
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted" onClick={(event) => {
                if (event.target === event.currentTarget) toggleExpand();
            }}>
                {isExpanded ? (<>
                    <NewDivision admin_slug={project?.admin?.slug} user_slug={user.slug} setDivisions={setDivisions} project_id={project.project_id}/>
                    <DivisionsList company={project.company} admin_slug={project?.admin?.slug} divisions={divisions} setDivisions={setDivisions}/>
                </>) : (<>
                    {divisions && divisions.length > 0 ? (<>Divisions: {divisions.length}</>) : (<>No divisions</>)}
                </>)
                }
            </Card.Footer>
        </Card>
    </>)
}

export default Project