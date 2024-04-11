import React, {useState, useEffect, useRef} from 'react';
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
import { replyRequestProfile } from '../../Requests/FriendUtils';
import { Container, Row, Col, Card ,Form} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

import UserImage from './UserImage';

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const { slug } = useParams();
    
    const [ data, setData] = useState();
    const [ work, setWork] = useState();
    const [requested, setRequested] = useState(false);
    const [friends, setFriends] = useState([])

    
    const reply = ( status) => {
        console.log("Reply Friend Request -> ", user, data?.user, status)
        replyRequestProfile( user, data?.user, status, requested)
    }
    
    useEffect( () => {
        setData(null)
        getUser(setData, setWork, slug)
        getFriends( slug, setFriends)
        setRequested(false)
    }, [slug]);
    
    const [ image, setImage] = useState(data?.image);
    useEffect(()=>{
        setImage(data?.image);
    }, [data?.image, image])

    useEffect(() => {
        if(data && user.id!=data.user)
            get_request( user?.id, data?.user, setRequested);
            getFriends( slug, setFriends)
    }, [slug, data, requested, replyRequestProfile]);

    return (
        <div className='profile'>
            { data ? (
                <> 
                    <Row className="d-flex justify-content-center">
                        <Col className="d-flex justify-content-start">
                            <UserImage image={image} setImage={setImage}/>
                            <Col xs={9}>
                                <Row>
                                    <Col xs={12}className="d-flex justify-content-start">
                                        {data.firstname} {data.midname} {data.lastname}
                                    </Col>
                                    <Col xs={12} className="d-flex justify-content-start">
                                        { work && 
                                            <Link to={`../company/${work.company.slug}`}>
                                                {work.company.name}
                                            </Link>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>

                    <Row className="justify-content-center"> <Col xs="auto">
                        {user.id!=data?.user && <FriendButton user={user.id} profile={data?.user} setRequested={setRequested} requested={requested} onReply={reply}/>}
                    </Col></Row> 
                    <Container fluid className="mt-5"> 
                        <Row className="justify-content-center"> 
                            <Col lg={4} className="left-div page-box order-lg-1 order-md-1 order-1">
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
                            <Col lg={8} className="right-divpage-box order-lg-2 order-md-2 order-2">
                                <PostsPublic user={user} url='../backend/posts/postpublic' slug={`/${slug}`} displayNew={slug===user.slug}/>
                            </Col> 
                        </Row> 
                    </Container> 
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default UserProfile;