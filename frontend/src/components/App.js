import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Login from "./Login";
import HomePage from "./HomePage";
// import GetRequest from "../GetRequest"

const App = (props) => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('session_user'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_data')));

    const handleLogin = (userV) => {
        setUser(userV)
        setAuthenticated(true);
    }

    const logOut = () => {
        localStorage.setItem('session_user', null);
        localStorage.setItem('user_data', null);
    }

    return(
        <div>
            <h1>FlowLoop</h1>
            <div>
                {console.log('PK:',authenticated,'User:',user)}
                {authenticated && user ? (
                    <div> 
                        <button onClick={logOut}>Logout</button>
                        <HomePage user={user}/>
                        <p>LOGGED IN</p>
                    </div>
                ) : (
                    <Login onLogin={handleLogin}/>
                )}
            </div>
        </div>
    )
}

export default App; 
render(<App />, document.getElementById("app"));