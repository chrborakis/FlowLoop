import axios from 'axios';
import Cookies from 'js-cookie';

export const getProjects = async(company,setProjects, setLoading, setHasNextPage) => {
    setLoading(true);
    await axios.get(`../backend/projects/projects/${company}`)
    .then(  res => {
        if( res.data.status === 200){
            console.log(res.data)
            setProjects(prevProjects => [...prevProjects, ...res.data.data]);
            setHasNextPage(res.data.has_next);
        }})
    .catch( err => {
        setLoading(false);
        console.log(err)})
    .finally( err => setLoading(false))
}

export const deleteProject = async(project_id,setProjects) => {
    await axios.delete(`../backend/projects/projects/${project_id}`,
    {method: 'DELETE',headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setProjects(prevData => prevData.filter(obj => obj.project_id !== project_id));
        }
    })
    .catch( err => console.log(err))
}

export const updateProject = async(project_id, data, setEdit, setProjects, setErrors) => {
    await axios.patch(`../backend/projects/projects/${project_id}`, data,
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setProjects(prevData =>prevData.map(item => (item.project_id === project_id ? { ...item, value: res.data.data } : item)));
            setEdit(false)
        }else if(res.data.status === 400){
            const errorData = res.data.data;
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                Object.keys(prevErrors).forEach(key => {
                    updatedErrors[key] = errorData[key] || prevErrors[key];
                });
                return updatedErrors;
            });
        }
    })
    .catch( err => console.log(err))
}

export const postProject = async( url, data, newProject, setIsContentVisible) => {
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

export const fetchStaff = async(company, setWorkers) => {
    await axios.get(`../backend/companies/staff/${company}`)
    .then( res => {
        console.log(res.data)
        setWorkers(res.data.data)
    })
    .catch( err => console.log(err))
}

export const setProjectAdmin = async( project_id, work_on, hide, setNewProject, project, setFormData) => {
    await axios.post(`../backend/projects/admin`, {project:project_id, admin:work_on},
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        if(res.data.status === 200){
            setNewProject({...project, admin: res.data.data.admin_info})
            setFormData({ title: '',  description: ''})
            hide();
        }
    })
    .catch( err => console.log(err.response.data))
}

export const addProject = async( data, hide, setNewProject, work_id, setProjectError, setProject, setFormData) => {
    await axios.post(`../backend/projects/projects/0`, data,
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            console.log(res.data)
            setProjectAdmin(res.data?.data?.project_id, work_id, hide, setNewProject, res.data.data, setFormData)
            setProject(res.data?.data?.project_id)
        }else if(res.data.status===400){
            setProjectError("This title arleady exists")
        }
    })
    .catch( err => console.log(err))
}