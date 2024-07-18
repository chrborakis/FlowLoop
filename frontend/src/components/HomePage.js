import React, { useState } from "react";
import { Row, Col, Card} from 'react-bootstrap';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";
import PostsPublic from "./Posts/PostsPublic";
import PostsPrivate from "./Posts/PostsPrivate";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../components/Extra/TabPanel'
import List from "./Chat/List";
import CompanyForm from "./Profiles/Company/NewCompany/CompanyForm";

import '../../static/css/HomePage.css'

const HomePage = ({user}) => {
    const [modalShow, setModalShow] = useState(false);
    
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <>
            <Col md={10} className="d-flex flex-column justify-content-start" style={{ margin: '2%' }}>
                <Row md={6} className="d-flex justify-content-center align-items-center">
                {
                    user?.company ? (
                        <Link to={`/company/${user?.company.slug}`}>
                            <Button variant="outlined">{user?.company.name}</Button>
                        </Link>
                    ) :  <>
                        <Button variant="outlined" onClick={() => setModalShow(true)}>Start your company</Button>
                        <CompanyForm show={modalShow} onHide={() => setModalShow(false)}/>
                    </>
                }
                </Row>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary"                  scrollButtons="auto" centered aria-label="scrollable auto tabs example">
                    <Tab label="Feed" />
                    {user?.company?.name && <Tab label={user?.company?.name} />}
                </Tabs>
                <div className="scroll-posts">
                    <TabPanel value={value} index={0}>
                        <PostsPublic user={user} url='backend/posts/postpublic' slug='/0'/>
                    </TabPanel>
                    {user?.company && 
                        <TabPanel value={value} index={1}>
                            <PostsPrivate user={user} url='backend/posts/postprivate' slug={user?.company.slug}/>
                        </TabPanel>
                    }
                </div>
            </Col>
            <Col className="friends-list d-flex flex-column justify-content-end">
                { user && <List user={{ user_id:user?.id, company_id:user?.company?.id, work_id:user?.work_id}} />}
            </Col>
        </>
    );
};

export default HomePage; 