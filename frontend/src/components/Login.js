import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async(e) => {
        e.preventDefault()
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login',
                {data: email}
            );

            if(response.ok) console.log('___OK___')
        }catch(error){
            console.log('Error sending data:', error.response)
        }
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