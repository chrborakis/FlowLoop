import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import Login from "./Login";
import HomePage from "./HomePage";
import UserProfile from "./User/UserProfile";
import './Header.css';

const Header = ({user}) => {
    const history = useHistory();

    const logOut = () => {
        localStorage.setItem('session_user', null);
        localStorage.setItem('user_data', null);
        history.push('/')
        window.location.reload();
    }

    return(
        <div> 
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
                
                <Route path="/"><HomePage user={user}/></Route>   
            </Switch>
        </div>
    )
}

export default Header; 
