import {Button,Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Row,Col} from 'react-bootstrap';
import React, { useEffect, useState }  from 'react';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import { useAuth } from "../../store/AuthContext";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserProfile from '../Profiles/User/UserProfile'
import HomePage from '../HomePage';
import CompanyProfile from '../Profiles/Company/CompanyProfile';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import WorkRequests from '../Requests/WorkRequests';
import FriendRequests from '../Requests/FriendRequests';

function NavBar({user}) {
    const { logout } = useAuth();
    const history = useHistory();

    // const notifications_label = `show ${notifications} new notifications`
    // const messages_label = `show ${messages} new messages`

    const logOut = () => {
        logout()
        history.push('/')
        window.location.reload();
    }


    const [refreshWorkRequests, setRefreshWorkRequests] = useState(false);
    const handleWorkRequestsUpdate = () => {
        setRefreshWorkRequests(prevRefresh => !prevRefresh);
    };

    const [searchValue, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect( () => {
            console.log(searchValue)
    },[searchValue])

    return (<>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="#">FlowLoop {expand}</Navbar.Brand>
                <Form className="d-flex">
                    <Form.Control  type="search"  placeholder="Search"  className="me-2"  aria-label="Search" value={searchValue} onChange={handleSearch} required  />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <NavDropdown title={
                        <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                            <AddBusinessIcon />
                        </IconButton>} id={`offcanvasNavbarDropdown-expand-${expand}`}>

                        <Row>
                        <Col>
                            <Tabs defaultActiveKey="friend" id="justify-tab-example" className="mb-3" justify>
                                <Tab eventKey="friend" title="Friend Requests">
                                    <FriendRequests refresh={refreshWorkRequests} />
                                </Tab>
                                {user.is_admin && 
                                <Tab eventKey="work" title="Work Requests">
                                    <WorkRequests company={user?.company?.id} refresh={refreshWorkRequests} />
                                </Tab>
                                 }
                            </Tabs>
                            </Col>
                        </Row>
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Something else here
                    </NavDropdown.Item> */}
                </NavDropdown>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Option
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {/* <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <Nav.Link href="#action2">LogOut</Nav.Link> */}
                            <Link to={`/user/${user.slug}`}>
                                {user.name}
                            </Link>
                            {user?.company?.slug && 
                                <Link to={`/company/${user?.company?.slug}`}>
                                    {user?.company?.name}
                                </Link>
                            }
                            <Link onClick={logOut}>Log Out</Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
      ))}
        <Switch>
            <Route path="/user/:slug">    <UserProfile /></Route>
            <Route path="/company/:slug"> <CompanyProfile /></Route>
            <Route path="/"><HomePage user={user}/></Route>   
        </Switch>
    </>
  );
}

export default NavBar;