import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import '../../../static/css/Login.css';
import {Form,Card,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

import {Grid,TextField,Button } from '@material-ui/core'
import '../../../static/css/index.css';

const Login = ({login}) => {
    const onLogin = (userV) => login(userV)  
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [errors, setErrors] = useState({});
    const [error, setError] = useState({email:"", password:""})

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleLogin = (e) => {
        e.preventDefault()
        setError({email:"", password:""})
        console.log(formData)

        const newErrors = {};
        Object.keys(formData).forEach( field => {
            if( !formData[field]) newErrors[field] = `Please insert your ${field}`
        })

        if(formData.password.length < 6) newErrors.password = "Password must be more that 6 digits"

        if( Object.keys(newErrors).length>0) setErrors(newErrors);
        else doLogin();
        
    }

    const doLogin = async(e) => {
        console.log('Form: ', formData)
        axios.post('backend/authentication/login', { formData},
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
        ).then(res => {
            console.log(res)
            if(res.data.authenticated){
                let user = JSON.parse(res.data.user);
                onLogin(user);
                console.log('Login Post request successful:', res.data)
            }
            if(res.data?.account === true) setError(prevState => ({...prevState,email: res.data?.message}))
            else if(res.data?.password === true) setError(prevState => ({...prevState,password: res.data?.message}))
            console.log(error)
        
        }).catch(err=>{
            console.error('Error in Login Post request:', err)
            setError(prevState => ({...prevState, password: 'Something went wrong!'}))
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]: value,});
    };

    return(
        // <div className='form'>
            <Grid container justify="center" alignItems='center'
            direction='column' spacing={5}>

           
            <Form className='' onSubmit={handleLogin}>
                <Card className="text-center">  
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Grid item>

                        <TextField variant="outlined" className="textfield"
                            placeholder="Enter your Email" name="email" type="email" 
                            label="Email" required fullWidth 
                            value={formData.email} onChange={handleInputChange}
                            />
                        {errors.email } 
                        <span className="text-danger">{error.email}</span>
                        </Grid>
                        <Grid item>
                        <FormControl variant="outlined" fullWidth style={{marginTop:'10%'}}>
                            <TextField  id="outlined-adornment-password"  className="textfield"  variant="outlined" 
                                label="Password" type={showPassword ? 'text' : 'password'}  placeholder="Enter your Password" 
                                name="password" required  value={formData.password}  onChange={handleInputChange}
                            />
                            <Form.Text className="text-muted">
                                {showPassword ? (
                                <VisibilityOff onClick={handleClickShowPassword} />
                                ) : (<Visibility onClick={handleClickShowPassword} />)}
                            </Form.Text>
                            {errors.password}
                            <span className="text-danger">{error.password}</span>
                        </FormControl>
                        </Grid>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button variant="contained" color='primary' type="submit">
                            Login
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </Grid>
    )
}

export default Login;