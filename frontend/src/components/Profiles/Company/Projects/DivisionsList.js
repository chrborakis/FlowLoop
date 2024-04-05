import React,{useState,useEffect} from "react";
import Division from "./Division";

const DivisionsList = ({divisions, setDivisions}) => {
    return(<>
        {divisions ? (
            divisions.map( division => <Division division={division} setDivisions={setDivisions}/>)
        ) : (
            <p>No divisions...</p>
        )}
    </>)
}

export default DivisionsList;