import React, { useState } from 'react';
import { Navbar, Nav, Button, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../static/css/BootstrapNavBar.css';

const BootstrapNav = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerToggle = () => setShowDrawer(!showDrawer); 

    return (<>
        <Navbar bg="darkpurple" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
              {/* <Nav className="mr-auto"> */}
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              {/* </Nav> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    <Button variant="outline-primary" className="ml-2" onClick={handleDrawerToggle}>
                      Open Drawer
                    </Button>
            </Navbar.Collapse>
        </Navbar>

        <Modal show={showDrawer} onHide={handleDrawerToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Drawer Content</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Add your drawer content here */}
                <p>Drawer Content Goes Here</p>
            </Modal.Body>
        </Modal>
    </>);
};

export default BootstrapNav;