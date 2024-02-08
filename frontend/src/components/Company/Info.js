import React, {useState, useEffect} from 'react';

const Info = ({data}) => {
    return(<>
        <div>
            <h1>Company Profile</h1>
            <div>
                <h1>{data.company_name }</h1>
                { data.image && <img src={'files/'+data.image} alt="company.name" width="150px" height="150px"/>}
                <p>{data.description} </p>
                <p>{data.establishment_date} </p>
                <p>{data.phone} </p>   
            </div>  
        </div>
    </>);
}

export default Info;