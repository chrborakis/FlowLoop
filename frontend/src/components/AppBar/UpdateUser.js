import axios from 'axios';
import Cookies from "js-cookie";

export const updateEmail = async( user_id, email, setSuccess, setErrors) => {
    await axios.patch(`${window.location.origin}/backend/api/usercredentials/${user_id}`, {email:email}, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
    ).then(  res => {
        if(res.status === 200){
            setSuccess({email: 'Email updated successfully', password:''})
        }
    }).catch( err => setErrors({email: err.response.data.email ,password:''}))
}

export const updatePassword = async( user_id, password, setSuccess, setErrors) => {
    await axios.patch(`${window.location.origin}/backend/api/usercredentials/${user_id}`, {password:password}, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
    ).then(  res => {
        if(res.status === 200){
            setSuccess({email: '', password:'Password updated successfully'})
        }
    }).catch( err => setErrors({email:'', password:err.response.data.password}))
}