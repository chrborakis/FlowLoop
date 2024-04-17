import React, {useState, useEffect, useRef} from "react";
import { Container, Col, Row, Card, Button, Dropdown, Form} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { getDivisions, deleteProject, updateProject} from "./ProjectUtils";
import DivisionsList from "./DivisionsList";
import "../../../../../static/css/projects.css"
import "../../../../../static/css/HomePage.css"
import { BsPlusLg } from "react-icons/bs";
import { useAuth } from '../../../../store/AuthContext';
import NewDivision from "./NewDivision";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import Range from "./Range";
import "../../../../../static/css/projects.css"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Change the theme accordingly
import 'primereact/resources/primereact.min.css';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { User } from "../../Profile";

const Project = ({project, setProjects}) => {
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

    const accept = () => {
        deleteProject(project.project_id, setProjects)
        setVisible(false)
    }
    const reject = () => setVisible(false);    

    // const dateFormat = new Intl.DateTimeFormat(undefined, {
    //     month: 'short',
    //     day: 'numeric',
    //   });

    const [value, setValue] = useState([
        project?.start_date,
        project?.finish_date,
    ]);

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
        const editedProject = {
            ...data,
            start_date: value[0],
            finish_date: value[1],
            phase: phase.name[0]
        }
        console.log(editedProject)
        updateProject(project.project_id, editedProject, setEdit, setProjects)
    }

    return(<>
        <Card className="card-content">
            <Card.Header>
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-start">
                        <User user={project.admin}/>
                    </Col>

                    <Col className="d-flex justify-content-end">
                        {project?.admin?.slug === user.slug && 
                            <Dropdown show={projectOpts} onToggle={toggleDropdown}>
                                <Dropdown.Toggle variant="secondary"><HiMiniCog6Tooth /></Dropdown.Toggle>
                                <Dropdown.Menu style={{  width: 'fit-content',  margin: 'auto',}}>
                                    <Button variant="outline-info"   onClick={handleEdit}>Edit</Button>

                                    <Button variant="outline-danger" icon="pi pi-check" label="Confirm" onClick={() => setVisible(true)}>Delete</Button>
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
                            {editMode ? (
                                <Form.Control name="title" type="text" disabled={!editMode}
                                    placeholder="Enter a title"
                                    value={data.title} onChange={handleInputChange} required  
                                />
                            ) : (<Col>{data.title}</Col>)}
                        </Row>

                        <Row className="align-items-center">
                            {editMode ? (
                                <Dropdown>
                                    <Dropdown.Toggle variant={phase.state} id="dropdown-basic">
                                        {phase.name}
                                    </Dropdown.Toggle>
                                
                                    <Dropdown.Menu>
                                        {options.map((option, index) => (
                                            <Dropdown.Item key={index} eventKey={option.value}
                                                onClick={(ev)=>handleSelect(ev.target)} active={phase.state === option.value}
                                                style={{ width: '100%' }}>
                                                <Badge bg={option.bgColor}>{option.label}</Badge>
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (<Badge pill bg={phase.state}>{phase.name}</Badge>)}
                        </Row>

                    </Card.Title>
                    <Card.Text>
                        {editMode ? (
                            <Form.Control name="description" type="text" as="textarea" rows={3}  disabled={!editMode}
                                placeholder="Enter your Description" 
                                value={data.description} onChange={handleInputChange} required  
                            />
                        ) : (<>{data.description}</>)}
                        

                        {editMode ? (
                            <Range value={value} setValue={setValue}/>
                        ) : (   
                            <>{value[0]} - {value[1]}</>
                        )
                        }
                    </Card.Text>
                    {editMode ? (
                        <Button variant="success" type="submit" disabled ={!editMode}>
                            Save
                        </Button>   
                    ) : (
                        <Button variant="outline" onClick={toggleExpand}>
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