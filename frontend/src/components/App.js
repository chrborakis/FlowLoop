import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { AuthProvider,useAuth } from "../store/AuthContext";

import "../../static/css/index.css"

import LoginRegister from "./LoginRegister/LoginRegister";
import NavBar from "./AppBar/NavBar";

import { getUserInfo } from "./Extra/UserInfo";

const App = () => {
    const { user, updateUser } = useAuth();   

    useEffect(()=>{
        if(user)getUserInfo(user?.id, updateUser)
        console.log(user)
    },[user?.id])

    return(
        <Router basename="/">
            <div className="body">
                { user ? (
                    <NavBar user={user} messages={0} notifications={0}/>
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
            <App />
    </AuthProvider> 
, document.getElementById("app"));