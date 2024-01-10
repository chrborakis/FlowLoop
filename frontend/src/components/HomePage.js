import React, { useState, useEffect } from "react";


const HomePage = ({user}) => {

    return(
        <div>
            <p>{user.name}</p>
            <img src={'files/'+user.image} alt="user.name" width="50px" height="50px"/>
        </div>
    )
}

export default HomePage; 