import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import HomePage from "./HomePage";
import UserProfile from "./User/UserProfile";
import '../../static/css/Header.css';
import { useAuth } from "../store/AuthContext";

const Header = ({user}) => {
    const { logout } = useAuth();
    const history = useHistory();

    const logOut = () => {
        logout()
        history.push('/')
        window.location.reload();
    }

    return(
        <div className="body"> 
            <div className="header">
                <nav>
                    <ul>
                        <li>
                            <Link to={`/user/${user.slug}`}>
                            <div>
                                <p>{user.name}</p>
                                <img src={'files/'+user.image} alt="user.name" width="50px" height="50px"/>
                            </div>
                            </Link>
                        </li><li>
                            <Link to="/">HomePage</Link>
                        </li><li> 
                            <button onClick={logOut}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route path="/user/:slug"> <UserProfile /></Route>
                <div className="homepage">
                    <Route path="/"><HomePage user={user}/></Route>   
                </div>
            </Switch>
        </div>
    )
}

export default Header; 
