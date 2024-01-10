import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';import { render } from "react-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Account from "./Account";

const Router = (props) => {
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">HomePage</Link>
                        </li><li>
                            <Link to={`/user/${user.slug}`}>{user.name}</Link>
                        </li><li> 
                            <button onClick={logOut}>Logout</button>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/user/:slug" component={Account}/>
                </Switch>
            </div>
        </Router> 
    )
}

export default Router; 
