import React,{useState,useEffect} from "react";
import Division from "./Division";
import '../../../../../static/css/index.css'

const DivisionsList = ({company, admin_slug, divisions, setDivisions}) => {
    return(<div className="list-scroll">
        {divisions ? (
            divisions.map( division => <Division key={division.division} company={company} admin_slug={admin_slug} division={division} setDivisions={setDivisions}/>)
        ) : (
            <p>No divisions</p>
        )}
    </div>)
}

export default DivisionsList;