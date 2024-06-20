import React,{useState,useEffect} from "react";
import { Form, Card, Row,Col } from "react-bootstrap";
import { Button } from "@material-ui/core";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { User, UserAvt } from "../../Profile";
import { TextField } from "@material-ui/core";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckIcon from '@mui/icons-material/Check';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { updateAdmin, getStaff, removeEmployee } from "../CompanyUtils";
import {useNotification} from '../../../../store/NotificationContext'

const Staff = ({user, company}) => {
    const {addNotification, socket} = useNotification();
    console.log("staff: ", socket)

    const [ staff, setStaff]     = useState([]);
    const [filteredMembers, setFiltered] = useState(staff)
    const [updateTrigger, setUpdateTrigger] = useState(false);

    useEffect( () => {
        if(company.id) {
            getStaff( company.id, setStaff)}
    },[company,updateTrigger])

    useEffect( () => {if(staff)setFiltered(staff)},[staff])


    //Remove member
    const [memberToRemove, setMemberToRemove] = useState({employee:null,name:'', sender: null, receiver:null, company: null, slug:null});
    const [visible,setVisible] = useState(false)

    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredCell, setHoveredCell] = useState(null);
        
    const onRemove = (member) => {
        setMemberToRemove({employee:member?.employee_id,name:member.employee?.name,
            sender: user?.id, receiver:member?.employee.id, company: member.company.name, slug: member.company.slug
        });
        setVisible(true);
    };

    const accept = () => {
        if(memberToRemove?.employee){
            setUpdateTrigger(prev => !prev);
            removeEmployee(memberToRemove, addNotification, user?.token, socket)
        }
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
        if(staff || searchQuery){
            setFiltered( staff?.filter(member => member?.employee?.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    },[staff,searchQuery])  
        
    const handleAdminClick = (member) => {
        if(member.employee.id!== user.id){
            setUpdateTrigger(prev => !prev);
            if(member.is_admin){
                updateAdmin( {employee:member?.employee_id,name:member.employee?.name,sender: user?.id, receiver:member?.employee.id, company: member.company.name, slug: member.company.slug}
                    ,false, addNotification, user?.token)
            }else{
                updateAdmin({employee:member?.employee_id,name:member.employee?.name,sender: user?.id, receiver:member?.employee.id, company: member.company.name, slug: member.company.slug}, 
                    true, addNotification, user?.token)
            }
        }
    };


    return(<>
        <Card className="text-center mx-auto d-block">  
            <Card.Header>Company Staff</Card.Header>
            {/* <Card.Body>     */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Form className='form' onSubmit={handleSubmit}>
                            <TextField label="Search" variant="outlined" style={{width:'90%'}}
                                value={searchQuery} onChange={handleSearchChange}
                                fullWidth margin="normal" size="small"
                            />
                        </Form>
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={member?.employee.user_id} onMouseEnter={() => setHoveredRow(member?.employee.user_id)} onMouseLeave={() => setHoveredRow(null)}>
                                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                    <TableCell><User user={member?.employee} circle={true} width={50}/></TableCell>
                                    <TableCell
                                        onClick={() => handleAdminClick(member)}
                                        onMouseEnter={() => setHoveredCell(member.employee.id)} onMouseLeave={() => setHoveredCell(null)}
                                    >
                                        {member.is_admin && !(user?.isAdmin && hoveredRow === member.employee.id && hoveredCell === member.employee.id && member.is_admin
                                            ) ? <CheckIcon /> : null}
                                        {user.isAdmin && (
                                            (hoveredRow === member.employee.id && hoveredCell === member.employee.id) &&
                                            (member.is_admin &&  member.employee.id!== user.id ? <ClearIcon/> : <CheckIcon />) 
                                        )}
                                           
                                    </TableCell>
                                    
                                    { user?.is_admin && member?.employee.id!== user.id && <TableCell><PersonRemoveIcon onClick={() => onRemove(member)}/></TableCell>}
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
                    {/* <Col xs={5}> */}
                        
                    {/* </Col> */}
                    {/* <Col xs={7}> */}
                        <TablePagination 
                            component="div" count={filteredMembers?.length || 0} rowsPerPage={rowsPerPage} page={page}
                            onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    {/* </Col> */}
                </Row>
                </Paper>    
            {/* {staff?.length > 0 ? (
            <ListGroup variant="flush">
                {staff?.map((result, index) => (
                    index % 2 === 0 && (
                        <ListGroup.Item key={`${result?.id}-${index}`}>
                            <div className="d-flex justify-content-between">
                                <Link to={`/user/${result.employee.slug}`}>
                                    <Badge bg={result.is_admin ? "primary" : "secondary"} title={result.is_admin ? "Admin" : ""} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <Avatar alt={result.employee.name} src={`/files/${result.employee.image}`} width={75} style={{ marginRight: '8px' }} />
                                        <span>{result.employee.name}</span>
                                    </Badge>
                                </Link>
                                {staff[index + 1] && ( 
                                    <Link to={`/user/${staff[index + 1].employee.slug}`}>
                                        <Badge bg={staff[index + 1].is_admin ? "primary" : "secondary"} title={staff[index + 1].is_admin ? "Admin" : ""} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <Avatar alt={staff[index + 1].employee.name} src={`/files/${staff[index + 1].employee.image}`} width={75} style={{ marginRight: '8px' }} />
                                            <span>{staff[index + 1].employee.name}</span>
                                        </Badge>
                                    </Link>
                                )}
                            </div>
                        </ListGroup.Item>
                    )
                ))} */}
            {/* </ListGroup> */}
        {/* ) : (<p>No users found</p>)} */}
            {/* </Card.Body> */}
            {/* <Card.Footer className="text-muted"> */}
            {/* </Card.Footer> */}
        </Card>
    </>)
}

export default Staff;