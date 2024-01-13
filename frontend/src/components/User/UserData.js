import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
const UserData = (props) => {

    const getUser = async(e) => {
        try {
            const response = await axios.get(`/api/user/${props.slug}`, {
                headers: {
                  'X-CSRFToken': Cookies.get('csrftoken'),
                },
              });
            props.onfetch(response.data.data);
            console.log(response.data.data);
        }catch (error) {
            console.error('Error in Fetch User Data', error);
        }
    }

    useEffect(() => {
        getUser();
      }, []);

      return(<></>);
}

export default UserData;