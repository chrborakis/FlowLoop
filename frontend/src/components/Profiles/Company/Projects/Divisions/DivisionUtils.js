export const getDivisions = async( company, setDivisions) => {
    await axios.get(`../backend/projects/divisions/${company}`)
    .then(  res => {
        if( res.data.status === 200){
            setDivisions(res.data.data)
        }})
    .catch( err => console.log(err))
}

export const addDivision = async( project_id, newDivision, setDivisions, setNewDivision, setError) => {
    await axios.post(`../backend/projects/divisions/${project_id}`, newDivision, 
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'),}}
    )
    .then( res => {
        if(res.data.status===200){
            setDivisions(prevDivs=>[res.data.data,...prevDivs])
            setNewDivision({project: project_id, title:'', description:'', file: null})
        }else if(res.data.status===400){
            setError(res.data.data.title)
        }
    })
    .catch( err => {
        console.log(err)
        // setError(res.data.data.title)
    })
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