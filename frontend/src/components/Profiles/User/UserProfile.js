import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from './UserUtils';
import PostsPublic from '../../Posts/PostsPublic';
import Info from './Info/Info';
import { useAuth } from '../../../store/AuthContext';

import '../../../../static/css/Profile/Profile.css'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { get_request } from './UserUtils';
import Education from './Info/Education';
import FriendButton from './FriendButton';

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();
    const [ work, setWork] = useState();
    const [requested, setRequested] = useState(false);

    useEffect( () => {getUser(setData, setWork, slug)}, [slug]);

    useEffect(() => {
        if(data && user.id!=data.user)
            get_request( user?.id, data?.user, setRequested);
    }, [slug, data, requested]);


    return (
        <div className='profile'>
            { data ? (
                <> 
                    <div className='preview'>
                        <div className="image">
                            {console.log}
                            <img src={data?.image} width={150}/>
                        </div>
                        <div className="name">
                            <h3>{data.firstname} {data.midname} {data.lastname}</h3>
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
                            <Tabs defaultActiveKey="basic-info" id="justify-tab-example" className="mb-3" justify>
                                <Tab eventKey="basic-info" title="User Info">
                                    <Info user={data} _user={user} updateUser={updateUser} admin={user.id===data?.user}/>
                                </Tab>
                                <Tab eventKey="education" title="Education">
                                    <Education user={data.user} admin={user.id===data?.user}/>
                                </Tab>
                            </Tabs>
                        </div>
                        <div className="right-side">
                            {
                                user.id!=data?.user && <FriendButton user={user.id} profile={data?.user} setRequested={setRequested} requested={requested}/>
                            }
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