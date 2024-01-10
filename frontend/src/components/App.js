import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Login from "./Login";
import Account from "./Account";
// import GetRequest from "../GetRequest"

const App = (props) => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('session_user'));
    const [user, setUser] = useState();

    const handleLogin = () => {
        setAuthenticated(true);
    };

    const handleUser = (userV) => {
        setUser(userV)
    }

    const logOut = () => {
        setAuthenticated(0);
        localStorage.setItem('authenticated', 0);
    }

    return(
        <div>
            <h1>FlowLoop</h1>
            <div>
                {authenticated>0 && user ? (
                    <div> 
                        <button onClick={logOut}>Logout</button>
                        <Account user={user}/>
                        <p>LOGGED IN</p>
                    </div>
                ) : (
                    <Login onLogin={handleLogin} onUser={handleUser}/>
                )}
            </div>
        </div>
    )
}

export default App; 
render(<App />, document.getElementById("app"));