import React,{useState,useEffect} from "react";
import { Dropdown,Form,Row,Col } from "react-bootstrap";

import { fetchStaff } from "../../Projects/Projects/ProjectUtils";
import { TextField, ButtonGroup, Button } from "@material-ui/core";
import '../../../../static/css/index.css'

import { addMember } from "./GroupUtils";
import { getNotMembers } from "./GroupUtils";

const AddMember = ({company, group, setMembers}) => {
    const [workers, setWorkers] = useState([])

    const [newMember, setNewMember] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const filteredWorkers = workers.filter((worker) => worker.employee.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(newMember){
            addMember( {member:newMember?.work_id, group: group.id}, setMembers, setNewMember)
        }
    }
    
    useEffect( ()=>{ 
        getNotMembers(group, setWorkers)
    },[addMember,group?.id])

    return(<>
        <Form onSubmit={handleSubmit}>
        <ButtonGroup>
            <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    {newMember ? newMember.name : 'Add Member'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', minWidth: '300px' }} onClick={()=>getNotMembers(group, setWorkers)}>
                        {filteredWorkers?.map((worker, index) => (
                            <Dropdown.Item key={index} eventKey={worker} onClick={() => setNewMember({work_id:worker.id, name:worker.employee.name})}>
                                <div className="d-flex align-items-center">
                                    <img src={`/files/${worker.employee.image}`} width={50} alt={worker.employee.name} />
                                    <span className="ml-2">{worker.employee.name}</span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </div>
                    <div style={{ position: 'sticky', bottom: '0', backgroundColor: 'white', padding: '0.5rem' }}>
                        <TextField label="Search" value={searchQuery} onChange={handleSearchChange} fullWidth margin="normal" size="small"/>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="secondary" type="submit">
                Submit
            </Button>
        </ButtonGroup>
        </Form>
    </>)
}

export default AddMember