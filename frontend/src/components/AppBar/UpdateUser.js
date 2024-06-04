import axios from 'axios';
import Cookies from "js-cookie";

export const getEmail = async(user, setEmail, setPassword, password) => {
    await axios.get(`${window.location.origin}/backend/api/usercredentials/${user?.id}`,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}}
    ).then(res => {
        if (res.status === 200) {
            setEmail(res.data.email)
            setPassword(password)
        }
    }).catch(err=>console.error('Error Getting Email', err.response));
}
    
export const updateEmail = async( user, email, setSuccess, setErrors) => {
    await axios.patch(`${window.location.origin}/backend/users/user_cred/${user?.id}`, {email:email}, 
        {headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': `${user.token}`,'Content-Type': 'application/json'}}
    ).then(  res => {
        console.log(res.data)
        if(res.data.status === 200){
            setSuccess({email: 'Email updated successfully', password:''})
        }else{
            setErrors({email: res.data.data.email, password:''})
        }
    }).catch( err => console.log(err.response))
}

export const updatePassword = async( user, password, setSuccess, setErrors) => {
    await axios.patch(`${window.location.origin}/backend/users/user_cred/${user?.id}`, {password:password}, 
        {headers:{'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': `${user.token}`,'Content-Type': 'application/json'}}
    ).then(  res => {
        if(res.data.status === 200){
            setSuccess({email: '', password:'Password updated successfully'})
        }else{
            setErrors({email:'', password:res.data.data.password})
        }
    }).catch( err => console.log(err.response))
}