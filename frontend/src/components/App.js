import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';
import Login from "./Login";
import HomePage from "./HomePage";
import UserProfile from "./User/UserProfile";
// import GetRequest from "../GetRequest"

const App = (props) => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('session_user'));
    const [user, setUser]                   = useState(JSON.parse(localStorage.getItem('user_data')));

    const handleLogin = (userV) => {
        setUser(userV)
        setAuthenticated(true);
    }

    const logOut = () => {
        localStorage.setItem('session_user', null);
        localStorage.setItem('user_data', null);
        window.location.reload();
    }

    return(
        <Router>
         <div>
             <h1>FlowLoop</h1>
             <div>
                 {console.log('PK:',authenticated,'User:',user)}
                 {authenticated && user ? (
                     <div> 
                         <button onClick={logOut}>Logout</button>
                         {/* <HomePage user={user}/> */}
                         <p>LOGGED IN</p>
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
                               {/* <Route path="/"><HomePage user={user}/></Route> */}
                               <Route path="/user/:slug" component={UserProfile}/>
                            </Switch>
                         </div>
                     </div>
                 ) : (
                     <Login onLogin={handleLogin}/>
                 )}
             </div>
         </div>
        </Router> 
    )
}

export default App; 
render(<App />, document.getElementById("app"));