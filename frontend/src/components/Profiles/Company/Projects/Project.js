import React, {useState, useEffect} from "react";
import { Container, Col, Row, Card, Button} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import {scrollTop} from '../../../Extra/LinkOnTop'
import { Link } from "react-router-dom";
import { getDivisions } from "./ProjectUtils";
import DivisionsList from "./DivisionsList";
import "../../../../../static/css/projects.css"
import "../../../../../static/css/HomePage.css"

const Project = ({project}) => {
    const [phase, setPhase] = useState({ name: "", state: "" });
    const [divisions,setDivisions] = useState([])
    
    useEffect(()=>{
        getDivisions(project.project_id, setDivisions)
    },[project])

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

    return(<>
        <Card className="card-content">
            <Card.Header>
            <Row>
                <Link to={`/user/${project.admin?.slug}`} onClick={scrollTop}>
                    <img src={`/files/${project.admin?.image}`} width={60}/>
                    {project.admin?.name}
                </Link>
            </Row>                       
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <Row>{project.title}
                        <Badge pill bg={phase.state}>{phase.name}</Badge>
                    </Row>
                </Card.Title>
                <Card.Text>
                    {project.description}
                    <p>{project.start_date} - {project.finish_date}</p>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <DivisionsList divisions={divisions} setDivisions={setDivisions}/>
            </Card.Footer>
        </Card>
    </>)
}

export default Project