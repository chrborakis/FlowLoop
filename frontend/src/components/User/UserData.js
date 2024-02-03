import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

const UserData = (props) => {
    const getUser = async(e) => {
      axios.get(`/backend/user/${props.slug}`
      // ,{headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
      ).then(  res => {
          props.onfetch(res.data.data);
          console.log(res.data.data);
      }).catch( err => console.log(err))
  };

    useEffect(() => {
        getUser();
      }, []);

      return(<></>);
}

export default UserData;