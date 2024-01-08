import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    function getCSRFToken() {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken='))
            .split('=')[1];
    
        return cookieValue;
    }
    const handleLogin = async(e) => {
        e.preventDefault()
            try{
            const response = await fetch('/api/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(),
                },
                body: JSON.stringify({email,password})
            });
            if(response.ok){
                console.log('___OK___')
            }else print(response)
        }catch(error){console.log(error)}
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