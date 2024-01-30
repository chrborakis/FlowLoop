import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Login from './Login';
import React from 'react';
import Register from './Register';
import { useAuth } from '../../store/AuthContext';

const LoginRegister = () => {
    const { login } = useAuth();

    return (
        <Tabs defaultActiveKey="login" id="justify-tab-example" className="mb-3" justify>
            <Tab eventKey="login" title="Login">
                <Login    login={login}/>
            </Tab>
            <Tab eventKey="register" title="Register">
                <Register login={login}/>
            </Tab>
        </Tabs>
    );
}
  
export default LoginRegister;