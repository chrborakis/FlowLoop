import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { AuthProvider,useAuth } from "../store/AuthContext";
import { RequestProvider }      from "../store/RequestContext";

import "../../static/css/index.css"
import Appbar from './AppBar/Appbar'

import LoginRegister from "./LoginRegister/LoginRegister";
import NavBar from "./AppBar/NavBar";

const App = () => {
    const { user } = useAuth();   

    return(
        <Router basename="/">
            <div className="body">
                { user ? (
                    <NavBar user={user} messages={0} notifications={0}/>
                    // <Appbar user={user} messages={0} notifications={0}/>
                ) : (
                    <div>
                        <h1>FlowLoop</h1>
                        <LoginRegister/>
                    </div>
                )}
            </div>
        </Router> 
    )
}

export default App; 
render( 
    <AuthProvider>
        {/* <RequestProvider> */}
            <App />
        {/* </RequestProvider> */}
    </AuthProvider> 
, document.getElementById("app"));