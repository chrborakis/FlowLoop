import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Login from './Login';
import React from 'react';
import Register from './Register';

const LoginRegister = () => {
    return (
        <Tabs defaultActiveKey="login" id="justify-tab-example" className="mb-3" justify>
            <Tab eventKey="login" title="Login">
                <Login />
            </Tab>
            <Tab eventKey="register" title="Register">
                <Register />
            </Tab>
        </Tabs>
    );
}
  
export default LoginRegister;