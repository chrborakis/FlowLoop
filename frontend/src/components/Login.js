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
                if(res.data.authenticated){
                    console.log('Login Post request successful:', res.data)
                    localStorage.setItem('session_user', res.data.user_id);

                    props.onLogin(JSON.parse(res.data.user));
                    
                    // props.onLogin(res.data.user);

                    // localStorage.setItem('user_data', JSON.stringify({
                    //     'name': JSON.parse(res.data.user).name,
                    //     'slug': JSON.parse(res.data.slug).slug,
                    //     'image':JSON.parse(res.data.user).image
                    // }))
                    const userObj = JSON.parse(res.data.user);
                    localStorage.setItem('user_data', JSON.stringify({
                        'name': userObj.name,
                        'slug': userObj.slug,
                        'image':userObj.image,
                        'company': userObj.company,
                    }))

                    const user = JSON.parse(localStorage.getItem('user_data'));
                    console.log('Login:', user)
                }
            })
            .catch(err=>console.error('Error in Login Post request:', err));
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