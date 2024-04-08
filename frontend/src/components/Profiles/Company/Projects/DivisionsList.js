import React,{useState,useEffect} from "react";
import Division from "./Division";

const DivisionsList = ({company, admin_slug, divisions, setDivisions}) => {
    return(<>
            {console.log(divisions)}
        {divisions ? (
            divisions.map( division => <Division key={division.division} company={company} admin_slug={admin_slug} division={division} setDivisions={setDivisions}/>)
        ) : (
            <p>No divisions...</p>
        )}
    </>)
}

export default DivisionsList;