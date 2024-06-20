import axios from 'axios';
import Cookies from 'js-cookie';
import { postNotification } from '../../AppBar/Notifications/NotificationsUtils';

export const getDivisions = async( company, setDivisions) => {
    await axios.get(`../backend/projects/divisions/${company}`,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'application/json'}})
    .then(  res => {
        if( res.data.status === 200){
            setDivisions(res.data.data)
        }})
    .catch( err => console.log(err))
}

export const addDivision = async( project_id, newDivision, setDivisions, setNewDivision, setError, setNewDivState, token) => {
    await axios.post(`../backend/projects/divisions/${project_id}`, newDivision, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}}
    )
    .then( res => {
        if(res.data.status===200){
            setDivisions(prevDivs=>[res.data.data,...prevDivs])
            setNewDivision({project: project_id, title:'', description:'', file: null})
            setNewDivState(false)
        }else if(res.data.status===400){
            setError(res.data.data.title)
        }
    })
    .catch( err => {
        console.log(err)
    })
}

export const uploadDivision = async( division, setDivisions, formData, setErrors) => {
    await axios.patch(`../backend/api/project_divisions/${division}`, formData,
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Content-Type': 'multipart/form-data'}})
    .then(  res => {
        if( res.status === 200){
            setDivisions(prevDivs => {
                return prevDivs.map(obj => {
                    if (obj.division === res.data.division) return res.data;
                    else return obj;
                });
            });
        }else{
            setErrors("Error uploading the file")
        }})
    .catch( err => {    
        setErrors("Wrong file format")
        console.log(err.response)
    })
}

export const deleteDivision = async( division_id, setDivisions, token) => {
    await axios.delete(`../backend/projects/divisions/${division_id}`,
    {method: 'DELETE',headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setDivisions(prevData => prevData.filter(obj => obj.division !== division_id));
        }
    })
    .catch( err => console.log(err))
}

export const replyRequest = async(request, data, division, setDivisions, onHide, token, admin_id, user_id, company_slug) => {
    await axios.patch(`../backend/projects/assign_request/${request}`, data, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then( async res => {
        if(res.data.status === 200){
            const assignResponse = await getAssign(division.division);
            setDivisions(prevData =>
                prevData.map(obj => {
                    if (obj.division === division.division) {
                        const updatedRequests = obj.requests.filter(req => req.id !== request);
                        return { ...obj, assign: assignResponse, requests: updatedRequests };
                    }
                    return obj;
                })
            );
            postNotification({user:user_id, sender:admin_id,
                message:'You have been accepted a new project!',
                url:`/company/${company_slug}/1/${division.project}`
            }, token)
            onHide();
        }
    })
    .catch( err => console.log(err))
}

export const requestAssign = async(request, setRequested, token) => {
    await axios.post(`../backend/projects/assign_request/0`, request, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then( res => {
        if(res.data.status===200){
            setRequested(true)
        }
    })
    .catch( err => console.log(err.response))
}

export const getAssign = async(division) => {
    try {
        const response = await axios.get(`../backend/api/project_assign/${division}`, {
            headers: {'X-CSRFToken': Cookies.get('csrftoken')}
        });
        console.log(response.data);
        return response.data.user; // Return the data fetched from the API
    } catch (error) {
        console.error('Error fetching assign data:', error);
        return null; // Return null or handle the error as needed
    }
}

export const addAssign = async(division, work_on, setDivisions, onHide, token, company_slug, admin_id, user_id) => {
    await axios.post(`../backend/projects/assign/${division.division}`, work_on, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then( res => {
        if(res.data.status === 200){
            setDivisions(prevData =>prevData.map(obj => obj.division === division.division ? { ...obj, assign: res.data.data.user } : obj));
            postNotification({user:user_id, sender:admin_id,
                message:'You have been assign to a new project!',
                url:`/company/${company_slug}/1/${division.project}`
            }, token)
            onHide();
        }
    })
    .catch( err => console.log(err))
}

export const removeAssign = async(divToDel, participant_id, setDivisions, token, admin_id, company_slug, user_id) => {
    await axios.delete(`../backend/projects/assign/${participant_id}`,
        {method: 'DELETE',headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token}})
    .then( res => {
        if(res.data.status === 200){
            setDivisions(prevData => prevData.map(obj => obj.division === divToDel.division ? { ...obj, assign: null } : obj));
            postNotification({user:user_id, sender:admin_id,
                message:'You have been removed from a project!',
                url:`/company/${company_slug}/1/${divToDel.project}`
            }, token)
        }
    })
    .catch( err => console.log(err.response.data))
}