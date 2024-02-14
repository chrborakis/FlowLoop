import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from './UserUtils';
import PostsPublic from '../../Posts/PostsPublic';
import Info from './Info';
import { useAuth } from '../../../store/AuthContext';

import '../../../../static/css/Profile.css'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const UserProfile = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();
    const [ work, setWork] = useState();

    useEffect( () => {getUser(setData, setWork, slug)}, [slug]);

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
                            {
                                work && 
                                <Link to={`../company/${work.company.slug}`}>
                                    <h3>{work.company.name}</h3>
                                </Link>
                            }
                        </div>
                    </div>


                    <div className="page">
                        <div className="left-side">
                            <Info data={data} />
                        </div>
                        <div className="right-side">
                            <PostsPublic user={user} url='../backend/postpublic' slug={`/${slug}`} displayNew={slug===user.slug}/>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default UserProfile;