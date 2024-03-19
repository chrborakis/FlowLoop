import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const getUser = async( setData, setWork, slug) => {
    axios.get(`/backend/user/${slug}`)
    .then(  res => {
        console.log("USERDATA: ", res.data)
        setData(res.data.data)
        setWork(res.data.workon)
    })
    .catch( err => console.log(err))
};

export const get_request = async ( user1, request, setRequested) => {
    console.log(user1, request)
    axios.get('/backend/friend_requests/', {params: { user1, request}}
    ).then(  res => {
        console.log(res.data.data)
        setRequested(res.data.data.status)
    })
    .catch( err => console.log(err))
};  

export const send_request = async( user1, request, setRequested, status) => {
    console.log("Friend request...", user1, request, status)
    axios.post('/backend/friend_requests/', { user1, request, status}
    ,{headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
    ).then(  res => {
        // if(res.data.status !== 200)
            // setRequested(status=="P")
        // addRequest(res.data);
        if(res.data.status===200 && res.data.created){
            setRequested(status=="P")
        }else if(res.data.status===200 && res.data.deleted){
            setRequested("")
        }
    }).catch( err => console.log(err))
};


export const getEducation = async( user, setEducation) => {
    axios.get(`/backend/education/${user}`)
    .then(  res => {
        if(res.data.status !== 404){setEducation(res.data.data)}
    })
    .catch( err => console.log(err))
}

export const postEducation = async( data, setEdit) => {
    axios.post("/backend/education/0", data)
    .then(  res => {
        if(res.data.status === 200)
        setEdit(false)})
    .catch( err => console.log(err))
}

export const getUniversity = async( user, setUniversity) => {
    axios.get(`/backend/university/${user}`)
    .then(  res => {
        if(res.data.status !== 404){
            console.log(res.data)
            setUniversity(res.data.data)
        }
    })
    .catch( err => console.log(err))
}

export const postUniversity = async( user, data, setEdit) => {
    console.log(data)
    axios.post(`/backend/university/${user}`, data)
    .then(  res => {if(res.status === 200)setEdit(false)})
    .catch( err => console.log(err))
}