import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';
import Login from "./Login";
import Header from "./Header";

const App = (props) => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('session_user'));
    const [user, setUser]                   = useState(JSON.parse(localStorage.getItem('user_data')));
    
    const handleLogin = (userV) => {
        setUser(userV)
        setAuthenticated(true);
    }

    return(
        <Router>
            <div>
                {console.log('PK:',authenticated,'User:',user)}
                {authenticated && user ? (
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
render(<App />, document.getElementById("app"));