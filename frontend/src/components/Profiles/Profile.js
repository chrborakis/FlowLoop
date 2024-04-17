import React from 'react';
import {scrollTop} from '../Extra/LinkOnTop';
import { Link } from 'react-router-dom'

export const User = ({ user}) => {
    const { name, slug, image} = user
    return(<>
        <Link to={`/user/${slug}`} onClick={scrollTop}>
            {image && <img src={`/files/${image}`} width={60}/>}
            {name}
        </Link>
    </>)
}

export const Company = ({ company}) => {
    const { name, slug, image} = company
    return(<>
        <Link to={`/company/${slug}`} onClick={scrollTop}>
            {image && <img src={`/files/${image}`} width={60}/>}
            {name}
        </Link>
    </>)
}