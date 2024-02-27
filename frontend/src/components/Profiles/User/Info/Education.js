import React, {useState, useEffect} from 'react';
import { getUniversity, getEducation } from '../UserUtils'

import University from './University';
import School from './School';

const Education = ({user, admin}) => {
    const [education, setEducation] = useState();
    const [university, setUniversity] = useState([]);
    
    useEffect( () => {
        getEducation(user,  setEducation)
        getUniversity(user, setUniversity)
    },[])


    return(<>   
        <School education={education} admin={admin}/>
        <University user={user} university={university} admin={admin}/>       
    </>);
}

export default Education;