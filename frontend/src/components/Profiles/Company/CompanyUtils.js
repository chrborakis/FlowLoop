import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../../store/AuthContext';


export const getAddress = async( company, setAddress) => {
    axios.get(`/backend/companies/address/${company}`)
    .then(  res => {
        console.log(res.data.data)
        setAddress(res.data.data)})
    .catch( err => console.log(err))
}

export const getStaff = async( company, setStaff) => {
    axios.get(`/backend/companies/staff/${company}`)
    .then(  res => {
        console.log(res.data)
        if(res.data.status === 200){
            const sortedData = [...res.data.data].sort((a, b) => (a.is_admin === b.is_admin) ? 0 : a.is_admin ? -1 : 1);
            setStaff(sortedData)
        }
    })
    .catch( err => console.log("ERROR", err))
}

export const updateAddress = async( company, address, setEdit, setError) => {
    console.log("company", company)
    axios.put(`../backend/api/address/${company}`, address
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} })
    .then( res => {
        console.log("RES", res)
        if(res.status === 200) setEdit(false);
    })
    .catch( err => {
        console.log("ERROR", err.response.data)
        setError("Failed to update address")
    }) 
}

export const getCompany = async( setData, slug) => {
    axios.get(`/backend/companies/company/${slug}`)
    .then(  res => setData(res.data.data))
    .catch( err => console.log(err))
};

export const updateCompany = async( company_slug, data, setEdit, setError) => {
    axios.patch(`../backend/api/companies/${company_slug}`, data
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }).
        then( res => {
            if(res.status === 200) {
                setEdit(false);
                const companyToSlug = (str) => str.trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
                const new_slug = companyToSlug(data.company_name)
                console.log(new_slug)
                if(company_slug != new_slug){
                    const { user, updateUser } = useAuth();
                    updateUser({...user,company: {name: data.company_name,slug: companyToSlug}});
                    history.pushState(null, null, `/company/${new_slug}`);
                }
            }
        }).
        catch( err => {
            console.log(err)
            if(err.response.data.phone[0]) setError(prevState => ({...prevState,phone: err.response.data.phone}))
        }) 
}

export const newCompany = async( user_id, data, address, setError, hide) => {
    try {
        const res = await axios.post('/backend/companies/company/0', {data, address}, 
            {headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if(res.data.status === 400) {
            console.log(res.data.data);
            setError(res.data.data);
            return null;
        } else if(res.data.status === 200) {
            const user_data = {
                "user": user_id,
                "company": res.data.data,
                "status": "A",
                "is_admin": true
            };
            const response = await sendWorkRequest(user_data, null);
            console.log("response sendwork: ", response)
            // hide
            return response;
        }
    } catch(err) {
        console.log(err);
    }
}


// CREATE ADDRESS
export const createCompany = async( user_id, data, address, setError, hide) => {
    console.log(data, address)
    try {
        const res = await axios.post('/backend/companies/address/0', { address}, 
            {headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
        );
        console.log(res.data);
        if(res.data.status === 400) {
            console.log(res.data.error);
            setError(res.data.error);
        } else if(res.data.status === 200) {
            const newCompanyResponse = await newCompany(user_id, data, res.data.data, setError, hide);
            return newCompanyResponse
        }
        // hide
    } catch(err) {
        console.log(err);
    }
}


export const get_request = async ( user, user_id, company_id, setRequested) => {
    // const { user1, updateUser } = useAuth()
    if( company_id){
        axios.get(`/backend/companies/id_workrequests/${user_id}/${company_id}`)
        .then(  res => {
            // if visited page = requested page
            if( company_id!=res.data.data.company) {setRequested('No')}
            if( company_id == res.data.data.company && res.data.data.status==='P'){setRequested('P')}
            //if works
            else if( user?.company?.id == res.data.data.company && res.data.data.status==='A'){
                setRequested('A')
            }
        })
        .catch( err => console.log(err))
    }
};  

export const sendWorkRequest = async ( data, setRequested) => {
    try {
        const res = await axios.post('/backend/companies/id_workrequests/0/0', data,
            {headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
        );
        if(setRequested != null) setRequested(true);
        console.log("sendWorkRequest -> ", res.data);
        return res.data;
    } catch(err) {
        console.log(err);
    }
};