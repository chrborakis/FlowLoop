import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';
import Login from "./Login";
import Header from "./Header";
import { AuthProvider,useAuth } from "../store/AuthContext";
import "../../static/css/index.css"

const App = () => {
    const { user, login, logout } = useAuth();

    const handleLogin = (userV) => login(userV)  

    return(
        <Router basename="/">
            <div className="body">
                { user ? (
                    <Header user={user}/>
                ) : (
                    <div>
                        <h1>FlowLoop</h1>
                        <p>Login</p>
                        <Login onLogin={handleLogin}/>
                    </div>
                )}
            </div>
        </Router> 
    )
}

export default App; 
render(<AuthProvider><App /></AuthProvider>, document.getElementById("app"));