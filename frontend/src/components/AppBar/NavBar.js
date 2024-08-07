import {Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Row,Col,Dropdown } from 'react-bootstrap';
import React, { useEffect, useState }  from 'react';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Button } from "@material-ui/core";

import { useAuth } from "../../store/AuthContext";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MessageContainer from '../Chat/MessageContainer';
import { Tabs, Tab } from '@material-ui/core';
import TabPanel from '../Extra/TabPanel';

import WorkRequests from '../Requests/WorkRequests';
import FriendRequests from '../Requests/FriendRequests';
import '../../../static/css/NavBar.css'
import '../../../static/css/index.css'
import ButtonGroup from '@mui/material/ButtonGroup';
import { User, Company } from '../Profiles/Profile';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChangeCredentials from './ChangeCredentials';
import Notifications from './Notifications/Notifications';
import { BsArchive } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
function NavBar({user, messages, notifications, requests}) {
    const { logout } = useAuth();
    const [reqTab, setReqTab] = useState(0);
    const handleReqTab = (event, newTab) => setReqTab(newTab);

    const logOut = () => logout()

    const [refreshRequests, setRefreshRequests] = useState(false);
    const toggleRequests = (isOpen) => setRefreshRequests(isOpen);

    const [refreshChat, setRefreshChat] = useState(false);
    const toggleMessages = (isOpen) => setRefreshChat(isOpen);

    const [refreshNotifications, setRefreshNotifications] = useState(false);
    const toggleNotifications = (isOpen) => setRefreshNotifications(isOpen);
    
    return (<>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar">
            <Container fluid>
                <Navbar.Brand href="/" className='nav-title'>FlowLoop</Navbar.Brand>
                <SearchBar />
                <div>
                    <div className="d-flex align-items-center">
                        <NavDropdown onClick={() => toggleRequests(!refreshRequests)} onToggle={toggleRequests} className='chat-list'
                            title={<IconButton size="large" aria-label="notifications" color="inherit">
                                <Badge badgeContent={requests.requests} color="error">
                                    <BsArchive style={{ color: 'white' }} />
                                </Badge>
                            </IconButton>}id={`requests-offcanvasNavbarDropdown-expand-${expand}`}
                        >
                        <Row>
                            <Col>
                            <Tabs value={reqTab} onChange={handleReqTab} indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Friend Requests" />
                                {user.is_admin && <Tab label="Work Requests" />}
                            </Tabs>
                            <TabPanel value={reqTab} index={0}>
                                <FriendRequests refresh={refreshRequests} />
                            </TabPanel>
                            {user.is_admin && (
                                <TabPanel value={reqTab} index={1}>
                                <WorkRequests company={user?.company?.id} refresh={refreshRequests} />
                                </TabPanel>
                            )}
                            </Col>
                        </Row>
                        </NavDropdown>

                        <NavDropdown onClick={() => toggleNotifications(!refreshChat)} onToggle={toggleNotifications}
                            title={<IconButton size="large" aria-label="notifications" color="inherit">
                                <Badge badgeContent={notifications.notifications} color="error">
                                    <IoIosNotifications style={{ color: 'white' }} />
                                </Badge>
                            </IconButton>}id={`notifications-offcanvasNavbarDropdown-expand-${expand}`}>
                        <Row>
                            <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
                            <Tab label="Notifications" />
                            </Tabs>
                            <TabPanel value={0} index={0}>
                            <Notifications user={user} refresh={refreshNotifications} notifications={notifications} />
                            </TabPanel>
                        </Row>
                        </NavDropdown>

                        <NavDropdown onClick={() => toggleMessages(!refreshChat)} onToggle={toggleMessages}
                        title={<IconButton size="large" aria-label="messages" color="inherit">
                            <Badge badgeContent={messages.messages} color="error">
                                <TiMessages style={{ color: 'white' }} />
                            </Badge>
                        </IconButton>}id={`messages-offcanvasNavbarDropdown-expand-${expand}`}>
                        <Row>
                            <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
                            <Tab label="Messages" />
                            </Tabs>
                            <TabPanel value={0} index={0}>
                            <MessageContainer user={user} refresh={refreshChat} messages={messages} />
                            </TabPanel>
                        </Row>
                        </NavDropdown>
                    </div>
                    </div>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} style={{ color: 'white' }} />
                <Navbar.Offcanvas id={`Options offcanvasNavbar-expand-${expand}`}aria-labelledby={`Options offcanvasNavbarLabel-expand-${expand}`} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`Options offcanvasNavbarLabel-expand-${expand}`}>
                            Options
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="d-flex flex-column">
                        <Col>                        
                            <Row><Badge><User user={user} /></Badge></Row>
                            {user?.company?.slug && (
                                <Row><Badge><Company company={user.company} /></Badge></Row>
                            )}
                        </Col>

                        <div className="log_out mt-auto">
                            <ButtonGroup orientation="vertical" aria-label="Vertical button group" variant="contained">
                                <ChangeCredentials user={user}/>
                                <Button variant="outlined" color="red">
                                    <Link to="/" onClick={logOut}>Log Out</Link>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;