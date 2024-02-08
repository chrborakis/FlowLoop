import React, {useState, useEffect} from 'react';

const Info = ({data}) => {
    return(<>
        <div>
            <h1>User Profile</h1>
              <p>{data.firstname} </p> 
              <p>{data.midname} </p> 
              <p>{data.lastname} </p> 
              { data.image && <img src={'files/'+data.image} alt="user.name" width="150px" height="150px"/>}
              <p>{data.slug} </p> 
              <p>{data.occupation} </p> 
              <p>{data.gender} </p> 
              <p>{data.image} </p> 
              <p>{data.phone} </p> 
              <p>{data.about} </p> 
              <p>{data.country} </p>   
        </div>
    </>);
}

export default Info;