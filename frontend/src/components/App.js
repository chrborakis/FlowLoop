import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';

import { AuthProvider,useAuth } from "../store/AuthContext";
import "../../static/css/index.css"
import Appbar from './AppBar/Appbar'

import LoginRegister from "./LoginRegister/LoginRegister";

const App = () => {
    const { user } = useAuth();

    return(
        <Router basename="/">
            <div className="body">
                { user ? (
                    <Appbar user={user} messages={4} notifications={3}/>
                ) : (
                    <div>
                        <h1>FlowLoop</h1>
                        <p>Login</p>
                        <LoginRegister/>
                    </div>
                )}
            </div>
        </Router> 
    )
}

export default App; 
render(<AuthProvider><App /></AuthProvider>, document.getElementById("app"));