import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import UserData from './UserData';

const UserProfile = () => {
    const { slug } = useParams();
    const [ data, setData] = useState();

    return (
      <div>
        { data ? (
            <div>
              <h1>User Profile</h1>
              <p>Current User:{ slug }</p>
                <p>{data.firstname} </p> 
                <p>{data.midname} </p> 
                <p>{data.lastname} </p> 
                <p>{data.slug} </p> 
                <p>{data.occupation} </p> 
                <p>{data.gender} </p> 
                <p>{data.image} </p> 
                <p>{data.phone} </p> 
                <p>{data.about} </p> 
                <p>{data.country} </p>   
            </div>
        ) : (
            <>
              <UserData onfetch={setData} slug={slug}/>
            </>
        )}
     
      </div>
    );
};

export default UserProfile;