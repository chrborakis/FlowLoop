import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = (props) => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async(e) => {
        e.preventDefault()
        axios.post('/api/authentication/login', { 
            email,password
        },{
            headers: {'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'application/json'}
        })
            //JSONResponse apo django 
            .then(res => {
                console.log('Post request successful:', res.data)
                props.onLogin();
                props.onUser(res.data);
            })
            .catch(err=>console.error('Error in POST request:', err));
    }

    return(
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;