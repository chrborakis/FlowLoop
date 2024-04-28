import React from 'react';
import {scrollTop} from '../Extra/LinkOnTop';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { Row } from 'react-bootstrap';
import '../../../static/css/Profile/Profile.css'
export const User = ({ user, circle, width}) => {
    const { name, slug, image} = user
    return( 
    // <Row className="d-flex justify-content-center">
        <Link to={`/user/${slug}`} onClick={scrollTop}>
    <div style={{display:'flex', alignItems:'center'}}>
            {circle ? (
                image && <Avatar alt={name} src={`/files/${image}`} width={width || 60}/>
            ) : (
                image && <img alt={name} src={`/files/${image}`} width={width || 60}/>
            )}
            <p className='name'>{name}</p>
    </div>
        </Link>
    // </Row>
)
}

export const Company = ({ company, circle, width}) => {
    const { name, slug, image} = company
    return(<>
        <Link to={`/company/${slug}`} onClick={scrollTop}>
            {circle ? (
                image && <Avatar alt={name} src={`/files/${image}`} width={width || 60}/>
            ) : (
                image && <img alt={name} src={`/files/${image}`} width={width || 60}/>
            )}
            {name}
        </Link>
    </>)
}