import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Card ,Form} from "react-bootstrap"; 
import { Tab, Tabs} from '@mui/material';
import TabPanel from '../../Extra/TabPanel';
import { Button } from "@material-ui/core";

import { useAuth } from '../../../store/AuthContext';
import Info from './Info/Info';
import Education from './Info/Education';
import Friends from './Friends';
import FriendButton from './FriendButton';
import ProfileImage from '../ProfileImage';
import PostsPublic from '../../Posts/PostsPublic';

import { getUser, getFriends, get_request } from './UserUtils';
import { replyRequestProfile } from '../../Requests/FriendUtils';

import '../../../../static/css/Profile/Profile.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNotification } from '../../../store/NotificationContext';

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const { addNotification }  = useNotification();
    const { slug } = useParams();
    
    const [ data, setData] = useState();
    const [ work, setWork] = useState();
    const [requested, setRequested] = useState(false);
    const [friends, setFriends] = useState([])
    
    const reply = ( status) => {
        console.log("Reply Friend Request -> ", user, data?.user, status)
        replyRequestProfile( user, {id:data?.user, slug:data?.slug}, status, setRequested, addNotification, user?.token)
    }
    
    const [ image, setImage] = useState(data?.image);
    useEffect( () => {
        setData(null)
        getUser(setData, setWork, slug)
        getFriends( slug, setFriends)
        setRequested(false)
    }, [slug]);

    useEffect(()=>{
        setImage(data?.image);
    }, [data?.image])

    useEffect(() => {
        if(data && user.id!=data.user)
            get_request( user?.id, data?.user, setRequested);
            getFriends( slug, setFriends)
    }, [slug, data]);

    const [tab, setTab] = useState(0);
    const handleTab = (event, newTab) => setTab(newTab);

    return (
        <div className='profile'>
            { data ? (
                <> 
                    <div className="d-flex justify-content-center">
                        <Card className="d-flex justify-content-center"style={{ borderRadius: '0.25rem', width:'450px'}}>
                            <Row className="d-flex justify-content-center">
                                <Col className="d-flex justify-content-start">
                                    <ProfileImage url={'users'} id={user.id} image={image} setImage={setImage} />
                                </Col>
                                <Col>
                                    <Row className="text-center d-flex justify-content-center">
                                        {data.firstname} {data.midname} {data.lastname}
                                    </Row>
                                    <Row className="text-center d-flex justify-content-center">
                                        {work && 
                                            <Link to={`../company/${work.company.slug}`}>
                                                {work.company.name}
                                            </Link>
                                        }
                                    </Row>
                                    <Row className="text-center d-flex justify-content-center">
                                            {user.id !== data?.user && (
                                            <FriendButton user={user.id} profile={data?.user} setRequested={setRequested} requested={requested} onReply={reply} token={user?.token}/>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </div>

                    <div className="d-flex justify-content-center profile_data">
                            <Col className="page-box order-lg-1 order-md-1 order-1">
                                <Tabs value={tab} onChange={handleTab}
                                        indicatorColor="primary" textColor="primary" centered
                                        aria-label="scrollable auto tabs example">
                                    <Tab label="Information"/>
                                    <Tab label="Education"/>
                                    <Tab label={`Friends (${friends.length})`}/>
                                </Tabs>
                                <TabPanel value={tab} index={0}>
                                    <Info user={data} _user={user} updateUser={updateUser} admin={user.id===data?.user} token={user?.token}/>
                                </TabPanel>
                                <TabPanel value={tab} index={1}>
                                    <Education user={data.user} admin={user.id===data?.user} token={user?.token}/>
                                </TabPanel>
                                <TabPanel value={tab} index={2}>
                                    { friends && <Friends friends={friends}/>}
                                </TabPanel>
                            </Col> 
                            <Col className="page-box order-lg-2 order-md-2 order-2">
                                <PostsPublic user={user} url='../backend/posts/postpublic' slug={`/${slug}`} displayNew={slug===user.slug}/>
                            </Col> 
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default UserProfile;