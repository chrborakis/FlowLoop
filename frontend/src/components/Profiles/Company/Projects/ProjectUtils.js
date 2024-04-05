import axios from 'axios';
import Cookies from 'js-cookie';

export const getProjects = async(company,setProjects, setLoading, setHasNextPage) => {
    setLoading(true);
    await axios.get(`../backend/projects/projects/${company}`)
    .then(  res => {
        if( res.data.status === 200){
            setProjects(prevProjects => [...prevProjects, ...res.data.data]);
            setHasNextPage(res.data.has_next);
        }})
    .catch( err => {
        setLoading(false);
        console.log(err)})
    .finally( err => setLoading(false))
}

export const postProject = async( url, data, newProject, setIsContentVisible) => {
    console.log("New Project: ", data)
    await axios.post(url, data,{
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'multipart/form-data'
    }})
    .then(  res => {
        console.log("New Project res.data: ", res.data)
        newProject(res.data);
        setIsContentVisible(false)
    }).catch( err => console.log(err))  
}

export const getDivisions = async( company, setDivisions) => {
    await axios.get(`../backend/projects/divisions/${company}`)
    .then(  res => {
        if( res.data.status === 200){
            setDivisions(res.data.data)
        }})
    .catch( err => console.log(err))
}

export const uploadDivision = async( division, setDivisions, file) => {
    await axios.patch(`../backend/api/project_divisions/${division}`, {file},{
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'multipart/form-data'
    }})
    .then(  res => {
        if( res.status === 200){
            console.log(res.data)
            setDivisions(prevDivs => {
                return prevDivs.map(obj => {
                    if (obj.division === res.data.division) return res.data;
                    else return obj;
                });
            });
        }})
    .catch( err => console.log(err.response.data))
}