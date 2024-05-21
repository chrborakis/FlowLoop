import React,{useState,useEffect} from "react";
import { Modal,Dropdown,Form,Row,Col } from "react-bootstrap";
import { Button } from "@material-ui/core";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { User } from "../../Profiles/Profile";
import { TextField } from "@material-ui/core";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckIcon from '@mui/icons-material/Check';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ClearIcon from '@mui/icons-material/Clear';
import { updateGroupMembers } from "./GroupUtils";
import { removeMember } from "./GroupUtils";
import { fetchStaff } from "../../Projects/Projects/ProjectUtils";

import '../../../../static/css/index.css'
import AddMember from "./AddMember";
import { addAdmin, removeAdmin } from "./GroupUtils";

const GroupMembers = (props) => {
    const {group, user} = props.chat;

    const [members, setMembers] = useState(props.members)
    const [admins,  setAdmins ]  = useState(props.admins)
    const [filteredMembers, setFiltered] = useState(members)

    //Remove member
    const [memberToRemove, setMemberToRemove] = useState({id:null,name:''});
    const [visible,setVisible] = useState(false)

    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredCell, setHoveredCell] = useState(null);
    
    useEffect(() => {
        updateGroupMembers(group?.id, setMembers, setAdmins)
    }, [group?.id]);
        
    const onRemove = (member) => {
        setMemberToRemove({id:member.member,name:member.name});
        setVisible(true);
    };

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

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
 
    useEffect(()=>{
        if(members || searchQuery){
            setFiltered( members?.filter(member => member?.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    },[members,searchQuery])  

    const isMemberAdmin = (member) => admins.some(admin => admin.user_id === member);
    
    const handleAdminClick = (member, isAdmin) => {
        if(member.user_id!== user.id){
            if(isAdmin){
                removeAdmin( member.member, setAdmins)
            }else{
                addAdmin( {admin:member.member}, setAdmins)
            }
        }
    };

    return(<>
        <Modal {...props} size="lg" centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="admin-inv-vcenter">
                    {group.name} Members
                </Modal.Title>
            </Modal.Header>
            {/* <Modal.Body style={{width:'100%'}}> */}
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={member.user_id} onMouseEnter={() => setHoveredRow(member.user_id)} onMouseLeave={() => setHoveredRow(null)}>
                                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                    <TableCell><User user={member} circle={true} width={50}/></TableCell>
                                    {/* <TableCell onClick={ () => handleAdminClick(member, isMemberAdmin(member.user_id))}>{isMemberAdmin(member.user_id) && <CheckIcon />}</TableCell> */}
                                    <TableCell
                                        onClick={() => handleAdminClick(member, isMemberAdmin(member.user_id))}
                                        onMouseEnter={() => setHoveredCell(member.user_id)} onMouseLeave={() => setHoveredCell(null)}
                                    >
                                        {isMemberAdmin(member.user_id) && !(props.isAdmin && hoveredRow === member.user_id && hoveredCell === member.user_id && isMemberAdmin(member.user_id)
                                            ) ? <CheckIcon /> : null}
                                        {props.isAdmin && (
                                            (hoveredRow === member.user_id && hoveredCell === member.user_id) &&
                                            (isMemberAdmin(member.user_id) && member.user_id!== user.id ? <ClearIcon/> : <CheckIcon />) 
                                        )}
                                           
                                    </TableCell>
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
            {/* </Modal.Body> */}
            <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                <AddMember company={group?.company} group={{id:group?.id, company:group?.company}} setMembers={setMembers}/>
            </Modal.Footer>
        </Modal>       
    </>)
}

export default GroupMembers;