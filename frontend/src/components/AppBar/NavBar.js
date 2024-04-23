import {Button,Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Row,Col,Dropdown } from 'react-bootstrap';
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
import SearchBar from './SearchBar';
import CompanyProfile from '../Profiles/Company/CompanyProfile';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import WorkRequests from '../Requests/WorkRequests';
import FriendRequests from '../Requests/FriendRequests';
import '../../../static/css/NavBar.css'

import { User, Company } from '../Profiles/Profile';

function NavBar({user}) {
    const { logout } = useAuth();
    // const history = useHistory();
    
    // const notifications_label = `show ${notifications} new notifications`
    // const messages_label = `show ${messages} new messages`
    
    const logOut = () => {
        logout()
        // history.push('/')
        // window.location.reload();
    }

    const [refreshWorkRequests, setRefreshWorkRequests] = useState(false);
    const handleWorkRequestsUpdate = () => {
        setRefreshWorkRequests(prevRefresh => !prevRefresh);
    };

    
    return (<>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar">
            <Container fluid>
                <Navbar.Brand href="/" className='nav-title'>FlowLoop</Navbar.Brand>
                <SearchBar />
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
                            {/* <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <Nav.Link href="#action2">LogOut</Nav.Link> */}
                        <Col className="justify-content-start">
                            <Row>
                                <Badge><User user={user} /></Badge>
                            </Row>
                            {user?.company?.slug && (
                                <Row>
                                    <Badge><Company company={user.company} /></Badge>
                                </Row>
                            )}
                            <Row>
                                <Link to="/" onClick={logOut}>Log Out</Link>
                            </Row>
                        </Col>
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