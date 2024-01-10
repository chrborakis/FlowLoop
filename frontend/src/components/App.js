import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Login from "./Login";
import Account from "./Account";
import GetRequest from "../GetRequest"

const App = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({})
    
    const handleLogin = () => {
        setAuthenticated(true);
    };

    const handleUser = (userV) => {
        this.setUser(userV)
    }


    return(
        <div>
            <h1>FlowLoop</h1>
            <div>
                {authenticated ? (
                    <div> 
                        <Account user={user}/>
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