import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import { AuthProvider,useAuth } from "../store/AuthContext";

import "../../static/css/index.css"
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import UserProfile from "./Profiles/User/UserProfile";
import HomePage from "./HomePage";
import CompanyProfile from "./Profiles/Company/CompanyProfile";
import LoginRegister from "./LoginRegister/LoginRegister";
import NavBar from "./AppBar/NavBar";

import { getUserInfo, getMessages} from "./Extra/UserInfo";

const App = () => {
    const { user, updateUser } = useAuth();   
    const [messages, setMessages] = useState(0)

    const updateUnread = (user_id, setMessages) => {
        console.log("updateUnread")
        getMessages(user_id, setMessages)}

    useEffect(()=>{
        if(user){
            getUserInfo(user?.id, updateUser)
            getMessages(user?.id, setMessages)
        }
        console.log(user)
    },[user?.id])

    useEffect(()=>{
        getMessages(user?.id, setMessages)
    },[messages])

    return(
        <Router basename="/">
            <div className="body">
                    { user ? (
                        <NavBar user={user} messages={{messages, setMessages,updateUnread}} notifications={0}/>
                    ) : (
                        <div><h1>FlowLoop</h1>
                            <LoginRegister/>
                        </div>
                    )}
                    <Switch>
                        <Route path="/user/:slug">    <UserProfile /></Route>
                        <Route path="/company/:slug"> <CompanyProfile /></Route>
                        <div className="content">
                            <Route   Route path="/"><HomePage user={user}/></Route>   
                        </div>
                    </Switch>
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