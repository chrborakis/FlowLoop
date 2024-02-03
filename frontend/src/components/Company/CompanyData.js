import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import Cookies from 'js-cookie';

const CompanyData = (props) => {
    const getCompany = async(e) => {
        console.log('Company')
        axios.get(`/backend/company/${props.slug}`
        // ,{headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
        ).then(  res => {
            props.onfetch(res.data.data);
            console.log(res.data.data);
        }).catch( err => console.log(err))
    };

    useEffect(() => {
        getCompany();
    }, []);

      return(<></>);
}

export default CompanyData;