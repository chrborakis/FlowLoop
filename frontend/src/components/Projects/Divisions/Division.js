import React,{useState,useEffect,useRef} from "react";
import { Container, Col, Row, Card, Form,Dropdown ,CloseButton} from 'react-bootstrap';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import { BsFillShiftFill } from "react-icons/bs";
import { uploadDivision, removeAssign, deleteDivision} from './DivisionUtils';
import { useAuth } from '../../../store/AuthContext';

import '../../../../static/css/projects.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DivisionInvite from '../Invite/DivisionInvite'

import { HiMiniCog6Tooth } from "react-icons/hi2";
import { ConfirmDialog } from 'primereact/confirmdialog';

import { User } from "../../Profiles/Profile";

const Division = ({ company, admin,division,setDivisions}) => {
    const {user} = useAuth();
    const [assignOptsOpen, setAssignOptOpen] = useState(false);
    const toggleDropdown = () => setAssignOptOpen(!assignOptsOpen);

    const fileInputRef = useRef(null);
    const handleButtonClick = () => fileInputRef.current.click();
    const [ file, setFile] = useState(null);
    const [errors,setErrors] = useState("")

    const [visible,setVisible] = useState(false)
    const accept = () => {
        deleteDivision(division.division, setDivisions, user?.token)
        setVisible(false)
    }
    const reject = () => setVisible(false);    

    const handleFileChange = (event) => {
        setErrors("")
        setFile(event.target.files[0]);
        if( event.target.files[0]){
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            uploadDivision( division.division, setDivisions, formData, setErrors)
        }
    };

    return(<>
        <Card id={`division-${division.division}`} style={{ width: '90%', marginTop: '10px' }}>
            <Card.Header>
            <Row className="align-items-center">
                {division?.assign ? (
                    <Col className="d-flex justify-content-start">
                        <User user={division.assign} circle/>
                    </Col>
                ) : (
                    <Col xs={8} className="d-flex justify-content-start">
                        <DivisionInvite division={division} company={company} admin={admin} user={user} setDivisions={setDivisions}/>
                    </Col>
                )}

                {admin.slug === user?.slug && (
                    <Col xs={4} className="d-flex justify-content-end">
                        <Dropdown show={assignOptsOpen} onToggle={toggleDropdown}>
                            <Dropdown.Toggle variant="secondary"><HiMiniCog6Tooth /></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <ButtonGroup variant="outlined" color="error" orientation="vertical" aria-label="Vertical button group">
                                    {division?.assign && <Button onClick={() => removeAssign(division, division.assign.participant_id,setDivisions, user?.token, admin?.id, company.slug, division?.assign?.id)}>Remove Assign</Button>}
                                    <Button icon="pi pi-check" label="Confirm" onClick={() => setVisible(true)}>Delete Division</Button>
                                </ButtonGroup>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                )}
                <ConfirmDialog visible={visible} onHide={() => setVisible(false)}
                    message="Are you sure you want to delete this division?" header="Delete Division"
                    icon="pi pi-exclamation-triangle" accept={accept} reject={reject}
                />
            </Row>   

            </Card.Header>
            <Card.Body>
                <Card.Title>{division.title}</Card.Title>
                <Card.Text>{division.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <>
                {division.file && 
                    <a href={division.file} target="_blank" rel="noopener noreferrer">{division.file}</a>
                }
                {
                    parseInt(user?.work_id) === parseInt(division.assign?.work_id) && (
                        <Form>
                            <Button onClick={handleButtonClick} className="button" type="submit" startIcon={<CloudUploadIcon/>}>
                                {division.file ? "Replace File" : "Upload File"}
                                <Form.Control  ref={fileInputRef}
                                    className="file-input" type="file"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </Button>
                            <span className="text-danger">{errors}</span>
                        </Form>
                    )
                }
                </>
            </Card.Footer>
        </Card>
    </>)
}

export default Division;