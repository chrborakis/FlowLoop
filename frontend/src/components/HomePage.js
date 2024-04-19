import React, { useState } from "react";
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import PostsPublic from "./Posts/PostsPublic";
import PostsPrivate from "./Posts/PostsPrivate";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../components/Extra/TabPanel'

import '../../static/css/HomePage.css'
import NewCompany from "./Profiles/Company/NewCompany";

const HomePage = ({user}) => {
    const [modalShow, setModalShow] = useState(false);
    
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <div className="homepage">
            <div className="box">
                {
                    user.company ? (
                        <Link to={`/company/${user.company.slug}`}>
                            <Button variant="outline-primary">{user.company.name}</Button>
                        </Link>
                    ) : <>
                        <Button variant="outline-primary" onClick={() => setModalShow(true)}>Start your company!</Button>
                        <NewCompany show={modalShow} onHide={() => setModalShow(false)} />
                    </>
                }
            </div>
            <div className="box">
                {/* <Tabs defaultActiveKey="public" id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="public" title="Public">
                        <PostsPublic user={user} url='backend/posts/postpublic' slug='/0' displayNew={true}/>
                    </Tab>
                    {user?.company?.name && 
                        <Tab eventKey="private" title={user?.company?.name}>
                            <PostsPrivate user={user} url='backend/posts/postprivate' slug={user.company.slug} displayNew={true}/>
                        </Tab>
                    }
                </Tabs> */}
                

                    <Tabs value={value} onChange={handleChange}
                        indicatorColor="primary" textColor="primary"
                        variant="scrollable" scrollButtons="auto" centered
                        aria-label="scrollable auto tabs example">
                        <Tab label="Feed" />
                        {user?.company?.name && <Tab label={user?.company?.name} />}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <PostsPublic user={user} url='backend/posts/postpublic' slug='/0'/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PostsPrivate user={user} url='backend/posts/postprivate' slug={user.company.slug}/>
                    </TabPanel>
            </div>
            <div className="box">
            </div>
        </div>
    );
};

export default HomePage; 