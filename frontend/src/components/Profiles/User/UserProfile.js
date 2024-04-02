import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUser,getFriends,get_request } from './UserUtils';
import PostsPublic from '../../Posts/PostsPublic';
import Info from './Info/Info';
import { useAuth } from '../../../store/AuthContext';

import '../../../../static/css/Profile/Profile.css'
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Education from './Info/Education';
import FriendButton from './FriendButton';
import Friends from './Friends';

import { Container, Row, Col, Card } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();
    const [ work, setWork] = useState();
    const [requested, setRequested] = useState(false);
    const [friends, setFriends] = useState([])

    useEffect( () => {
        setData(null)
        getUser(setData, setWork, slug)
        getFriends( slug, setFriends)
        setRequested(false)
    }, [slug]);

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
                    <Row className="justify-content-center"> <Col xs="auto">
                        {user.id!=data?.user && <FriendButton user={user.id} profile={data?.user} setRequested={setRequested} requested={requested}/>}
                    </Col></Row> 
                    {/* <div className='page'> */}
                    <Container fluid className="mt-5"> 
                        <Row className="justify-content-center"> 
                        {/* <div className='left'> */}
                            <Col xs={12} md={6} lg={4} className="page-box order-lg-1 order-md-1 order-1">
                                <Tabs defaultActiveKey="basic-info" id="justify-tab-example" className="mb-3" justify>
                                    <Tab eventKey="basic-info" title="User Info">
                                        <Info user={data} _user={user} updateUser={updateUser} admin={user.id===data?.user}/>
                                    </Tab>
                                    <Tab eventKey="education" title="Education">
                                        <Education user={data.user} admin={user.id===data?.user}/>
                                    </Tab>
                                    <Tab eventKey="friends" title={`Friends (${friends.length})`}>
                                        { friends && <Friends friends={friends}/>}
                                    </Tab>
                                </Tabs>
                            </Col> 
                            {/* </div> */}
                            {/* <div className='right'> */}
                            <Col xs={12} md={6} lg={4} className="page-box order-lg-2 order-md-2 order-2">
                                <PostsPublic user={user} url='../backend/posts/postpublic' slug={`/${slug}`} displayNew={slug===user.slug}/>
                            </Col> 
                            {/* </div> */}
                        </Row> 
                    </Container> 
                    {/* </div> */}

                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default UserProfile;