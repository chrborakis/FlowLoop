import React, { useState, useEffect } from "react";


const Account = ({user}) => {

    return(
        <div>
            <p>{user.firstname}</p>
            {user.midname && <p>{user.midname}</p>}
            <p>{user.lastname}</p>
            <p>{user.occupation}</p>
            <p>{user.gender}</p>
            <p>{user.image}</p>
            <p>{user.phone}</p>
            <p>{user.about}</p>
            <p>{user.country}</p>
        </div>
    )
}

export default Account; 