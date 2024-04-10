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

export const deleteDivision = async( division_id, setDivisions) => {
    await axios.delete(`../backend/projects/divisions/${division_id}`,
    {method: 'DELETE',headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setDivisions(prevData => prevData.filter(obj => obj.division !== division_id));
        }
    })
    .catch( err => console.log(err))
}

export const updateProject = async(project_id, data, setEdit, setProjects) => {
    await axios.patch(`../backend/projects/projects/${project_id}`, data,
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setEdit(false)
            setProjects(prevData =>prevData.map(item => (item.project_id === project_id ? { ...item, value: res.data.data } : item)));
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

export const getDivisions = async( company, setDivisions) => {
    await axios.get(`../backend/projects/divisions/${company}`)
    .then(  res => {
        if( res.data.status === 200){
            setDivisions(res.data.data)
        }})
    .catch( err => console.log(err))
}

export const addDivision = async( project_id, newDivision, setDivisions) => {
    console.log("PROEJCT_ID: ", project_id)
    await axios.post(`../backend/projects/divisions/${project_id}`, newDivision, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),}}
    )
    .then( res => {
        if(res.data.status===200){
            setDivisions(prevDivs=>[res.data.data,...prevDivs])
        }
    })
    .catch( err => console.log(err.response.data))
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

export const fetchStaff = async(company, setWorkers) => {
    await axios.get(`../backend/companies/staff/${company}`)
    .then( res => {
        console.log(res.data)
        setWorkers(res.data.data)
    })
    .catch( err => console.log(err))
}

export const addAssign = async(division, work_on, setDivisions, onHide) => {
    await axios.post(`../backend/projects/assign/${division}`, work_on, 
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data.data)
        setDivisions(prevData =>
            prevData.map(obj =>
                obj.division === division ? { ...obj, assign: res.data.data.user } : obj
            )
        );
        onHide();
    })
    .catch( err => console.log(err))
}

export const removeAssign = async(divToDel, participant_id,setDivisions) => {
    await axios.delete(`../backend/projects/assign/${participant_id}`,
    {method: 'DELETE',headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        if(res.data.status === 200){
            setDivisions(prevData =>
                prevData.map(obj =>
                    obj.division === divToDel ? { ...obj, assign: null } : obj
                )
            );
        }
    })
    .catch( err => console.log(err.response.data))
}

export const setProjectAdmin = async( project_id, work_on, onSubmit, setNewProject, project) => {
    await axios.post(`../backend/projects/admin`, {project:project_id, admin:work_on},
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        if(res.data.status === 200){
            setNewProject({...project, admin: res.data.data.admin_info})
            onSubmit();
        }
    })
    .catch( err => console.log(err.response.data))
}

export const addProject = async( data, onSubmit, setNewProject, work_id, setProjectError, setProject) => {
    await axios.post(`../backend/projects/projects/0`, data,
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            console.log(res.data)
            setProjectAdmin(res.data?.data?.project_id, work_id, onSubmit, setNewProject, res.data.data)
            setProject(res.data?.data?.project_id)
        }else if(res.data.status===400){
            setProjectError("This title arleady exists")
        }
    })
    .catch( err => console.log(err))
}