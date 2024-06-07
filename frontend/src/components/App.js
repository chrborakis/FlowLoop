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

import { getUserInfo, getUnreadMessages} from "./Extra/UserInfo";
import { getUnreadNotifications, readNotification } from "./AppBar/NotificationsUtils";

const App = () => {
    const { user, updateUser } = useAuth();   
    const [messages, setMessages] = useState(0)
    const [notifications, setNotifications] = useState(0)

    const updateUnreadMessages      = (user_id, setMessages) => getUnreadMessages(user_id, setMessages)
    const updateUnreadNotifications = (user_id, setMessages) => getUnreadNotifications(user_id, setNotifications)

    useEffect(()=>{
        if(user){
            getUserInfo(user?.id, updateUser)
            getUnreadMessages(user?.id, setMessages)
            getUnreadNotifications(user?.id, setNotifications)
        }
    },[user?.id])

    useEffect( ()=> {getUnreadMessages(user?.id, setMessages)},[messages])
    useEffect( ()=> {getUnreadNotifications(user?.id, setNotifications)},[notifications,readNotification])

    return(
        <Router basename="/">
            <div className="body">
                { user ? (<>
                    <NavBar user={user} messages={{messages, setMessages,updateUnreadMessages}} notifications={{notifications, setNotifications, updateUnreadNotifications,readNotification}}/>
                    <Switch>
                        <Route path="/user/:slug">    <UserProfile /></Route>
                        <Route path="/company/:slug"> <CompanyProfile /></Route>
                        <Route path="/company/:slug/:content"> <CompanyProfile /></Route>
                        <div className="content">
                            <Route  Route path="/"><HomePage user={user}/></Route>   
                        </div>
                    </Switch>
                </>) : (<>
                    <h1>FlowLoop</h1>
                    <LoginRegister/>
                </>)}
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