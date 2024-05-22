import React from 'react';
import {scrollTop} from '../Extra/LinkOnTop';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { Row } from 'react-bootstrap';
import '../../../static/css/Profile/Profile.css'

const stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  
const stringAvatar = (name) => {
    return {
        sx: {bgcolor: stringToColor(name),},
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

export const User = ({ user, circle, width}) => {
    console.log(user)
    const { name, slug, image} = user
    const imageUrl = image
        ? (image.startsWith('/files\\') || image.startsWith('/files'))
            ? image
            : `/files/${image}`
        : '';

    return( 
        <Link to={`/user/${slug}`} onClick={scrollTop}>
            <div style={{display:'flex', alignItems:'center'}}>
            {imageUrl ? (
                circle ? (
                    imageUrl && <Avatar alt={name} src={imageUrl} width={width || 60}/>
                ) : (
                    imageUrl && <img alt={name} src={imageUrl} width={width || 60}/>
                )
            ) : (
                <Avatar {...stringAvatar(name)} width={width || 60}/>
            )}
            { name && <p className='name'>{name}</p>}
            </div>
        </Link>
    )
}

export const UserAvt = ({user, width, circle}) => {
    const { name, image} = user
    const imageUrl = image
        ? (image.startsWith('/files\\') || image.startsWith('/files'))
            ? image
            : `files\\${image}`
        : '';

    
    return( <>
        {imageUrl ? (
            circle ? (
                imageUrl && <Avatar alt={name} src={imageUrl} width={width || 60}/>
            ) : (
                imageUrl && <img alt={name} src={imageUrl} width={width || 60}/>
            )
        ) : (
            <Avatar {...stringAvatar(name)} alt={name} width={width || 60}/>
        )}
    </>)
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