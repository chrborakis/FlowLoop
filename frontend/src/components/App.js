import React, { useState, useEffect, useContext  } from "react";
import { render } from 'react-dom';

import { AuthProvider, useAuth } from "../store/AuthContext";
import { ChatProvider, useChat } from "../store/ChatContext";
import { RequestProvider, useRequest } from "../store/RequestContext";
import { NotificationProvider, useNotification } from "../store/NotificationContext";

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';

import UserProfile from "./Profiles/User/UserProfile";
import HomePage from "./HomePage";
import CompanyProfile from "./Profiles/Company/CompanyProfile";
import LoginRegister from "./LoginRegister/LoginRegister";
import NavBar from "./AppBar/NavBar";

import { getUserInfo, getUnreadMessages} from "./Extra/UserInfo";
import { postNotification,getUnreadNotifications, readNotification, getUnreadRequests } from "./AppBar/Notifications/NotificationsUtils";
import Post from "./Posts/Post";
import Project from "./Projects/Projects/Project";
import "../../static/css/index.css"

const App = () => {
    const { user, updateUser } = useAuth(); 
    const { notifications, setNotifications} = useNotification();
    const { messages, setMessages} = useChat()
    const { requests, setRequests} = useRequest();

    const updateUnreadMessages      = (user_id, setMessages) => getUnreadMessages(user_id, setMessages)
    const updateUnreadRequests      = (user_id, setRequests) => getUnreadRequests(user_id, setRequests)
    const updateUnreadNotifications = (user_id, setNotifications) => getUnreadNotifications(user_id, setNotifications)

    useEffect(()=>{
        if(user){
            getUserInfo(user?.id, updateUser)
            getUnreadMessages(user?.id, setMessages)
            getUnreadNotifications(user?.id, setNotifications)
            getUnreadRequests(user?.id, setRequests)
        }
    },[user?.id])

    return(
        <Router basename="/">
            <div className="body">
                { user ? (<>
                    <NavBar user={user} 
                        messages={{messages, setMessages, updateUnreadMessages}}
                        requests={{requests, setRequests, updateUnreadRequests}}
                        notifications={{notifications, setNotifications, updateUnreadNotifications, readNotification}}
                    />
                    <Routes>
                        <Route path="/user/:slug" element={<UserProfile />}/>
                        <Route path="/company/:slug?/:tab?/:content?" element={<CompanyProfile/>}/>
                        <Route path="/" element={<HomePage user={user}/>}/>
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