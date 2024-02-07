import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import UserData from './UserData';
import PostsPublic from '../Posts/PostsPublic';
import Info from './Info';
import { useAuth } from '../../store/AuthContext';
import axios from 'axios';

const UserProfile = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();

    return (
        <div>
            <h1>User {slug} Profile</h1>
            { data ? (
                <div>
                    <Info data={data}/>
                    <hr></hr>
                    <PostsPublic user={user} url='../backend/postpublic'/>
                </div>
            ) : (
                  <UserData onfetch={setData} slug={slug}/>
            )}
        </div>
    );
};

export default UserProfile;