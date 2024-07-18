import React, { useState, useEffect} from 'react';
import { getCompany} from './CompanyUtils';

import { useAuth }    from '../../../store/AuthContext';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../Extra/TabPanel';

import PostsPrivate from '../../Posts/PostsPrivate';
import ProjectsList from '../../Projects/Projects/ProjectsList';
import { useParams,useNavigate } from 'react-router-dom';
import {Card, Row,Col, Container} from 'react-bootstrap';
import InfoTabs from './Info/InfoTabs';
import CompanyHeader from './CompanyHeader';

import "bootstrap/dist/css/bootstrap.min.css"; 
// import '../../../../static/css/Profile/Profile.css';

const CompanyProfile = () => {
    const { user, updateUser } = useAuth();
    const [ data, setData]       = useState();
    
    const { slug, tab, content } = useParams(); 
    const navigate = useNavigate(); 

    const [tabContent, setTabContent] = useState(0);
    const handleTabContent = (event, newTabContent) => {
        setTabContent(newTabContent)
        navigate(`/company/${slug}/${tab}#${content}`);
    };

    useEffect(() => {
        if (tab) {
            setTabContent(parseInt(tab))
        };
    }, [tab]);

    useEffect(() => {
        if (content) {
          const scrollToElement = (retryCount = 0) => {
            const element = document.getElementById(content);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else if (retryCount < 10) { // Retry up to 10 times
              setTimeout(() => scrollToElement(retryCount + 1), 100);
            }
          };
          scrollToElement();
        }
      }, [content]);
    
    useEffect( () => {getCompany(setData, slug)}, [slug]);

    return (
        <>
        { data ? (
            <> 
                <CompanyHeader slug={slug} data={data} user={user}/>

                <div className="d-flex justify-content-center profile_data">
                    <Col className="page-box order-lg-1 order-md-1 order-1">
                        <InfoTabs user={user} slug={slug} data={data}/>
                    </Col> 
                    <Col className="page-box order-lg-2 order-md-2 order-2">
                        {user?.company?.id == data?.company_id ? (
                            <>
                                <Tabs value={tabContent} onChange={handleTabContent} indicatorColor="primary" textColor="primary"scrollButtons="auto">
                                    <Tab label="Posts"/>
                                    <Tab label="Projects"/>
                                </Tabs>
                                <TabPanel value={tabContent} index={0}>
                                    <PostsPrivate user={user} url='../backend/posts/postprivate' slug={slug} displayNew={true}/>
                                </TabPanel>
                                <TabPanel value={tabContent} index={1}>
                                    <ProjectsList company={data?.company_id}/>
                                </TabPanel>
                            </>

                        ) : ( <p>You should grant access to view content!</p>)}
                        </Col> 
                </div>
            </>
        ) : (<>Page Not Found!</>)}
        </>
    );
};

export default CompanyProfile;