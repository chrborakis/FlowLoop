import axios from 'axios';
import Cookies from 'js-cookie';

export const searchUsers = async( search, setUsers) => {
    axios.get(`/backend/search_users/${search}`)
    .then(  res => {
        if(res.status === 200) setUsers(res.data.users)
    })
    .catch( err => console.log(err.response))
};

export const searchCompanies = async( search, setCompanies) => {
    axios.get(`/backend/search_companies/${search}`)
    .then(  res => {
        if(res.status === 200) setCompanies(res.data.companies)      
    })
    .catch( err => console.log(err.response))
};