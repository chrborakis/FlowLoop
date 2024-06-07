import React,{useState,useEffect} from "react";
import Division from "./Division";
import '../../../../static/css/index.css'

const DivisionsList = ({company, admin, divisions, setDivisions}) => {
    return(<div className="list-scroll">
        {divisions ? (
            divisions.map( division => <Division key={division.division} company={company} admin={admin} division={division} setDivisions={setDivisions}/>)
        ) : (
            <p>No divisions</p>
        )}
    </div>)
}

export default DivisionsList;