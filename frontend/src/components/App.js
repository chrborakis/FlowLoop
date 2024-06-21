import React, { useState, useEffect, useContext  } from "react";
import { render } from 'react-dom';

import { AuthProvider, useAuth } from "../store/AuthContext";
import { ChatProvider, useChat } from "../store/ChatContext";
import { NotificationProvider, useNotification } from "../store/NotificationContext";

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';

import UserProfile from "./Profiles/User/UserProfile";
import HomePage from "./HomePage";
import CompanyProfile from "./Profiles/Company/CompanyProfile";
import LoginRegister from "./LoginRegister/LoginRegister";
import NavBar from "./AppBar/NavBar";

import { getUserInfo, getUnreadMessages} from "./Extra/UserInfo";
import { postNotification,getUnreadNotifications, readNotification } from "./AppBar/Notifications/NotificationsUtils";

import "../../static/css/index.css"

const App = () => {
    const { user, updateUser } = useAuth(); 
    const { notifications, setNotifications} = useNotification();
    const { messages, setMessages} = useChat()

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
    useEffect( ()=> {getUnreadNotifications(user?.id, setNotifications)},[notifications])

    return(
        <Router basename="/">
            <div className="body">
                { user ? (<>
                    <NavBar user={user} messages={{messages, setMessages,updateUnreadMessages}} notifications={{notifications, setNotifications, updateUnreadNotifications,readNotification}}/>
                    <Routes>
                        <Route path="/user/:slug" element={<UserProfile />}/>
                        <Route path="/company/:slug?/:tab?/:content?" element={<CompanyProfile/>}/>
                        {/* <div className="content"> */}
                            <Route path="/" element={<HomePage user={user}/>}/>
                        {/* </div> */}
                    </Routes>
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
        <NotificationProvider>
            <ChatProvider>
                <App />
            </ChatProvider>
        </NotificationProvider>
    </AuthProvider> 
, document.getElementById("app"));