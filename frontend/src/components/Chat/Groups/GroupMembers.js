import React,{useState,useEffect} from "react";
import { Modal,Dropdown,Form,Row,Col } from "react-bootstrap";
import { Button } from "@material-ui/core";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import { User } from "../../Profiles/Profile";
import { TextField } from "@material-ui/core";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckIcon from '@mui/icons-material/Check';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { updateGroupMembers } from "./GroupUtils";
import { removeMember } from "./GroupUtils";

const GroupMembers = (props) => {
    const [members, setMembers] = useState(props.members)
    const [admins,  setAdmins ]  = useState(props.admins)
    const [filteredMembers, setFiltered] = useState(members)
    //Remove member
    const [memberToRemove, setMemberToRemove] = useState({id:null,name:''});
    const [visible,setVisible] = useState(false)

    useEffect(() => {
        console.log("useEffect")
        console.log("props: ", props)
        updateGroupMembers(props.group?.id, setMembers, setAdmins)
    }, []);

    const onRemove = (member) => {
        setMemberToRemove({id:member.member,name:member.name});
        setVisible(true);
    };

    // useEffect(() => {
    //     if(memberToRemove?.id) {
    //         removeMember(memberToRemove.id)
    //             .then(() => updateGroupMembers(props.group?.id, props.setMembers, props.setAdmins)
    //         );
    //     }
    // }, [memberToRemove]);

    const accept = () => {
        if(memberToRemove?.id)removeMember(memberToRemove.id, setMembers)
        setVisible(false);
    };
    const reject = () => setVisible(false); 
    
    const handleSubmit = async(e) => {
        e.preventDefault()
    }
    const columns = [
        { id: 'no', label: 'No', minWidth: 50, align: 'left'},
        { id: 'name', label: 'Name', minWidth: 100, align: 'left'},
        { id: 'admin', label: 'Admin', minWidth: 100, align: 'left'},
        { id: 'occupation', label: 'Occupation', minWidth: 170, align: 'left'},
      ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [selectedOption, setSelectedOption] = useState();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    } 

    useEffect(()=>{
        if(members){
            console.log("members",members)
            setFiltered( members?.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    },[members])

    useEffect(()=>{
        if(filteredMembers){
            console.log("filteredMembers",filteredMembers)
        }
    },[filteredMembers])

    // const filteredMembers = members?.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()));
    

    const isMemberAdmin = (member) => admins.some(admin => admin.user_id === member);

    return(<>
        <Modal {...props} size="lg" centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="admin-inv-vcenter">
                    {props.group.name} Members
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:'100%'}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440, width: '100%', margin: 'auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { filteredMembers!=null && filteredMembers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={member.code}>
                                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                    <TableCell> <User user={member} circle={true} width={50}/></TableCell>
                                    <TableCell>{isMemberAdmin(member.user_id) && <CheckIcon />}</TableCell>
                                    <TableCell>{member.occupation}</TableCell>
                                    
                                    {props.isAdmin && <TableCell><PersonRemoveIcon onClick={() => onRemove(member)}/></TableCell>}
                                </TableRow>
                            );
                        })}
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)}
                            message={`Are you sure you want to remove ${memberToRemove.name}?`} header="Remove Member"
                            icon="pi pi-exclamation-triangle" accept={accept} reject={reject}
                        />
                    </TableBody>
                    </Table>
                </TableContainer>
                <Row>
                    <Col xs={5}>
                        <Form className='form' onSubmit={handleSubmit}>
                        <TextField label="Search" variant="outlined" style={{width:'90%'}}
                            value={searchQuery} onChange={handleSearchChange}
                            fullWidth margin="normal" size="small"
                        />
                        </Form>
                    </Col>
                    <Col xs={7}>
                        <TablePagination rowsPerPageOptions={[10, 25]}
                            component="div" count={filteredMembers?.length || 0} rowsPerPage={rowsPerPage} page={page}
                            onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Col>
                </Row>
                </Paper>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" type="submit">Assign</Button>
            </Modal.Footer>
        </Modal>       
    </>)
}

export default GroupMembers;