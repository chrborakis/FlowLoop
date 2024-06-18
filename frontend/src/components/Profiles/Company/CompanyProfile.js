import React, { useContext, useState, useEffect} from 'react';
import { getCompany, get_request, sendWorkRequest, getAddress, getStaff } from './CompanyUtils';

import { useAuth }    from '../../../store/AuthContext';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../Extra/TabPanel';

import PostsPrivate from '../../Posts/PostsPrivate';

import ProjectsList from '../../Projects/Projects/ProjectsList';
import Button from '@mui/material/Button';
import { useParams,useNavigate } from 'react-router-dom';
import {Card, Row,Col, Container} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 
import ProfileImage from '../ProfileImage';
// import '../../../../static/css/Profile/Profile.css';
import { replyRequest } from '../../Requests/WorkUtils';
import InfoTabs from './InfoTabs';
import CompanyHeader from './CompanyHeader';

const CompanyProfile = () => {
    const { user, updateUser } = useAuth();
    const [ data, setData]       = useState();
    
    const { slug, tab, content } = useParams(); // Include tab in useParams
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    const [tabContent, setTabContent] = useState(0);
    const handleTabContent = (event, newTabContent) => setTabContent(newTabContent);

    useEffect(() => {
        if (tab) setTabContent(parseInt(tab));
    }, [tab]);
    
    useEffect( () => {getCompany(setData, slug)}, [slug]);

    return (
        <div>
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
                                <Tabs value={tabContent} onChange={handleTabContent}indicatorColor="primary" textColor="primary"scrollButtons="auto" centeredaria-label="scrollable auto tabs company">
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

                        {/* <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} */}
                        </Col> 
                </div>
            </>
        ) : (<>Page Not Found!</>)}
        </div>
    );
};

export default CompanyProfile;