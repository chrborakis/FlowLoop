import React, { useState } from "react";
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import {Button, Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import PostsPublic from "./Posts/PostsPublic";
import PostsPrivate from "./Posts/PostsPrivate";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../components/Extra/TabPanel'
import FriendList from "./Chat/FriendList";
import '../../static/css/HomePage.css'
import NewCompany from "./Profiles/Company/NewCompany";
import CompanyForm from "./Profiles/Company/NewCompany/CompanyForm";

const HomePage = ({user}) => {
    const [modalShow, setModalShow] = useState(false);
    
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <div className="homepage">
            {/* <div className="box">
                {user?.company ? (
                    <Link to={`/company/${user?.company.slug}`}>
                        <Button variant="outline-primary">{user?.company.name}</Button>
                    </Link>
                ) : <>
                    <Button variant="outline-primary" onClick={() => setModalShow(true)}>Start your company!</Button>
                    <CompanyForm show={modalShow} onHide={() => setModalShow(false)}/>
                </>
            }
            </div> */}
            {/* <div className="box"> */}
            <Col lg={9}>
            {
                    user?.company ? (
                        <Link to={`/company/${user?.company.slug}`}>
                            <Button variant="outline-primary">{user?.company.name}</Button>
                        </Link>
                    ) : <>
                        <Button variant="outline-primary" onClick={() => setModalShow(true)}>Start your company!</Button>
                        {/* <NewCompany show={modalShow} onHide={() => setModalShow(false)} /> */}
                        <CompanyForm show={modalShow} onHide={() => setModalShow(false)}/>
                    </>
                }
                <Tabs value={value} onChange={handleChange}
                    indicatorColor="primary" textColor="primary"
                    scrollButtons="auto" centered
                    aria-label="scrollable auto tabs example">
                    <Tab label="Feed" />
                    {user?.company?.name && <Tab label={user?.company?.name} />}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <PostsPublic user={user} url='backend/posts/postpublic' slug='/0'/>
                </TabPanel>
                {user?.company && 
                    <TabPanel value={value} index={1}>
                        <PostsPrivate user={user} url='backend/posts/postprivate' slug={user?.company.slug}/>
                    </TabPanel>
                }
            </Col>
            {/* </div>  */}
            {/* <div className="box">  */}
            <Col lg={3} style={{background:'red'}}>
                <FriendList user_id={user?.id}/>
            </Col>
            {/* </div> */}
        </div>
    );
};

export default HomePage; 