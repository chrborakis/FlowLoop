import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Login from './Login';
import React from 'react';
import Register from './Register';
import { useAuth } from '../../store/AuthContext';

const LoginRegister = () => {
    const { login } = useAuth();

    return (<>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <img src="files/logo_horizontal.svg" width="200px" alt="Logo" />
        </div>
        <Tabs defaultActiveKey="login" id="justify-tab-example" className="mb-3" justify>
            <Tab eventKey="login" title="Login">
                <Login    login={login}/>
            </Tab>
            <Tab eventKey="register" title="Register">
                <Register login={login}/>
            </Tab>
        </Tabs>
    </>);
}
  
export default LoginRegister;