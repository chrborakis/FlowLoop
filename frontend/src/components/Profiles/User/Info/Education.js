import React, {useState, useEffect} from 'react';
import { getUniversity, getEducation } from '../UserUtils'

import University from './University';
import School from './School';

const Education = ({user, admin, token}) => {
    const [education, setEducation] = useState();
    const [university, setUniversity] = useState([]);
    
    useEffect( () => {
        getEducation(user,  setEducation)
        getUniversity(user, setUniversity)
    },[])


    return(<>   
        <School user={user} education={education} admin={admin} token={token}/>
        <University user={user} university={university} admin={admin} token={token}/>       
    </>);
}

export default Education;