import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../../store/AuthContext';
import {changeImage} from '../User/UserUtils'

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
    .then(  res => {
        if(res.data.status === 200) setData(res.data.data)
        else setData(null)
    })
    .catch( err => console.log(err))
};

export const updateCompany = async( company_slug, data, setEdit, setError) => {
    axios.patch(`../backend/api/companies/${company_slug}`, data
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'} }).
        then( res => {
            if(res.status === 200) {
                if(setEdit)setEdit(false);
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

export const createCompany = async( user_id, data, image, setErrors) => {
    console.log('next: ', next)
    try{
        const res = await axios.post('/backend/companies/company/0', data, 
            {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}
        });
        if(res.data.status === 200) {
            const user_data = {"user": user_id,"company": res.data.data.company_id ,"status": "A","is_admin": true};
            const postImage = await changeImage( 'companies', res.data.data.company_id, image, null, null)
            const response  = await sendWorkRequest(user_data, null);
            return response;
        }else{
            const errorData = res.data.data;
            console.log(errorData)
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                Object.keys(prevErrors).forEach(key => {
                    updatedErrors[key] = errorData[key] || prevErrors[key];
                });
                return updatedErrors;
            });
        }
    } catch(err) {console.log(err)}
}

// CREATE ADDRESS
export const createAddress = async( company_id, address, setEdit, setErrors) => {
    console.log("address", address)
    axios.post(`/backend/companies/address/${company_id}`, address, 
    {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}})
    .then( res => {
        if(res.data.status === 200)
            console.log(res.data);
            setEdit(false)
        if(res.status === 400)setErrors(res.data.error);
    })
    .catch( err => {
        console.log("ERROR", err)
    }) 
}

export const get_request = async ( user, user_id, company_id, setRequested) => {
    // const { user1, updateUser } = useAuth()
    if( company_id){
        axios.get(`/backend/companies/id_workrequests/${user_id}/${company_id}`)
        .then(  res => {
            console.log(res)
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