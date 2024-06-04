import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const getUser = async( setData, setWork, slug) => {
    axios.get(`/backend/users/user/${slug}`)
    .then(  res => {
        console.log("USERDATA: ", res.data)
        setData(res.data.data)
        setWork(res.data.workon)
    })
    .catch( err => console.log(err))
};

export const updateUser = async( company_slug, data, setEdit, setError, token) => {
    axios.patch(`../backend/api/companies/${company_slug}`, data
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}}).
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

export const changeImage = async( url, id, image, setImage, setNewImage) => {
    // url: users || companies
    const data = {'image':image}
    
    axios.patch(`../backend/api/${url}/${id}`, data,
    {headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        "Content-Type": "multipart/form-data"
    }})
    .then(  res => {        
        if(res.status===200) {
            if(setImage) setImage(res.data.image)
            if(setNewImage)setNewImage(res.data.image)
        }
    })
    .catch( err => console.log(err.response.data))
};

export const getFriends = async( user, setFriends) => {
    axios.get(`/backend/users/friends/${user}`)
    .then(  res => {
        if(res.data.status === 200){
            setFriends(res.data.data)
        }
    })
    .catch( err => console.log("ERROR", err))
}

export const get_request = async ( sender, receiver, setRequested) => {
    axios.get('/backend/users/friend_requests/', {params: { sender, receiver}}
    ).then(  res => {
        console.log(res.data)
        const response = res.data.data
        console.log("get_request: ", response)

        setRequested(response.status)
        
    })
    .catch( err => console.log(err))
};  

export const send_request = async( sender, receiver, setRequested, status, token) => {
    console.log("Friend request...", sender, " to " , receiver, status)
    axios.post('/backend/users/friend_requests/', { sender, receiver, status}
    ,{headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}}
    ).then(  res => {
        console.log(res.data)
        if(res.data.status === 200){
            if(res.data.created){
                setRequested(status=="P")
            }else if(res.data.deleted){
                setRequested("D")
            }
        }
    }).catch( err => console.log(err))
};


export const getEducation = async( user, setEducation) => {
    axios.get(`/backend/users/education/${user}`)
    .then(  res => {
        if(res.data.status !== 404){setEducation(res.data.data)}
    })
    .catch( err => console.log(err))
}

export const postEducation = async( data, setEdit, setAlert, token) => {
    axios.post("/backend/users/education/0", data,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.data.status === 200){
            setEdit(false)
            setAlert({state: true, info:"success", text:"Education updated successfully!"})
        }else{
            setAlert({state: true, info:"error", text:"Failed to update education!"})
        }
    })
    .catch( err => console.log(err))
}

export const editEducation = async( data, setEdit, setAlert, token) => {
    axios.patch(`/backend/users/education/${data.id}`, data,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.data.status === 200){ 
            setEdit(false)
            setAlert({state: true, info:"success", text:"Education updated successfully!"})
        }else{setAlert({state: true, info:"error", text:"Failed to update education!"})}
    })
    .catch( err => console.log(err))
}

export const getUniversity = async( user, setUniversity) => {
    axios.get(`/backend/users/university/${user}`)
    .then(  res => {
        if(res.data.status !== 404){
            console.log(res.data)
            setUniversity(res.data.data)
        }
    })
    .catch( err => console.log(err))
}

export const postUniversity = async( user, data, setEdit, setAlert, token) => {
    axios.post(`/backend/users/university/${user}`, data,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then(  res => {
        if(res.status === 200){
            setEdit(false)
            setAlert({state: true, info:"success", text:"University updated successfully!"})
        }else{setAlert({state: true, info:"error", text:"Failed to update university!"})}
    })
    .catch( err => console.log(err))
}