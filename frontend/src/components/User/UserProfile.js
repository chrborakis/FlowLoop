import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import UserData from './UserData';
import PostsPublic from '../Posts/PostsPublic';
import Info from './Info';
import { useAuth } from '../../store/AuthContext';

import '../../../static/css/Profile.css'
import Card from 'react-bootstrap/Card';


const UserProfile = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();
    return (
        <div>
            <h1>User {slug} Profile</h1>
            { data ? (
                <> 
                    <div className='preview'>
                        <div className="image">
                            <img src={data?.image ? data?.image : "/files/user_image/dummy-user.png"} width={150}/>
                        </div>
                        <div className="name">
                            <h3>{data.firstname}  {data.lastname}</h3>
                        </div>
                    </div>


                    <div className="page">
                        <div className="left-side">
                            <Info data={data} />
                        </div>
                        <div className="right-side">
                            <PostsPublic user={user} url='../backend/postpublic' slug={`/${user.id}`}/>
                        </div>
                    </div>
                </>
            ) : (
                  <UserData onfetch={setData} slug={slug}/>
            )}
        </div>
    );
};

export default UserProfile;