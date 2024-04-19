import React, { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, get_request, sendWorkRequest, getAddress, getStaff } from './CompanyUtils';

import { useAuth }    from '../../../store/AuthContext';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../Extra/TabPanel';

import PostsPrivate from '../../Posts/PostsPrivate';
import Info from './Info/Info';
import Address from './Info/Address';
import Staff from './Info/Staff';
import ProjectsList from '../../Projects/Projects/ProjectsList';

import {Card, Row,Col, Container,Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 
import ProfileImage from '../ProfileImage';
// import '../../../../static/css/Profile/Profile.css';

const CompanyProfile = () => {
    const { user, updateUser } = useAuth();
    const { slug } = useParams();

    const [ data, setData] = useState();
    const [ address, setAddress] = useState();
    const [ staff, setStaff] = useState([]);
    const [ image, setImage] = useState(data?.image);

    const [tabInfo, setTabInfo] = useState(0);
    const handleTabInfo = (event, newTabContent) => setTabInfo(newTabContent);

    const [tabContent, setTabContent] = useState(0);
    const handleTabContent = (event, newTabContent) => setTabContent(newTabContent);

    const [requested, setRequested] = useState(false);
    const isCompanyNameUnavailable = user?.company?.name === null;

    useEffect( () => {
        getCompany(setData, slug)
    }, [slug]);

    useEffect(()=>{
        setImage(data?.image);
    }, [data?.image])

    useEffect( () => {
        if(data?.company_id) {
            getAddress(data?.address, setAddress)
            getStaff(  data?.company_id, setStaff)
        }
    },[data?.company_id,slug])

    useEffect(() => {
        if(data) get_request( user, user?.id, data?.company_id, setRequested)
    }, [ data, slug, requested]);

    const sendRequest = () => {
        const user_data = {
            "user": user.id,
            "company": data?.company_id,
            "status": "P"
        }
        sendWorkRequest( user_data, setRequested)
    };
    return (
        <div>
        { data ? (
            <> 
                <Row className="justify-content-center align-items-center">
                    <Col className="d-flex justify-content-start align-items-center">
                        <ProfileImage url={'companies'} id={data?.company_id} image={image} setImage={setImage}/>
                        <Col xs={9} className="d-flex align-items-center">
                            {data.company_name}
                        </Col>
                    </Col>
                </Row>

                <Container fluid className="mt-5"> 
                    <Row className="justify-content-center"> 
                        <Col lg={4} className="left-div page-box order-lg-1 order-md-1 order-1">
                            {/* <Tabs defaultActiveKey="basic-info" id="justify-tab-example" className="mb-3" justify>
                                <Tab eventKey="basic-info" title="Company Information">
                                    { data    && <Info company={data} admin={data?.company_id===user?.company?.id && user.is_admin}/>}
                                </Tab>
                                <Tab eventKey="address" title="Address">
                                    { address && <Address address={address} admin={data.company_id===user?.company?.id && user.is_admin}/>}
                                </Tab>
                                <Tab eventKey="staff" title={`Staff (${staff.length})`}>
                                    { staff && <Staff staff={staff}/>}
                                </Tab>
                            </Tabs> */}

                            <Tabs value={tabInfo} onChange={handleTabInfo}
                                        indicatorColor="primary" textColor="primary" centered
                                        aria-label="scrollable auto tabs example">
                                    <Tab label="Information"/>
                                    <Tab label="Address"/>
                                    <Tab label={`Staff (${staff.length})`}/>
                            </Tabs>
                            <TabPanel value={tabInfo} index={0}>
                                { data    && <Info company={data} admin={data?.company_id===user?.company?.id && user.is_admin}/>}
                            </TabPanel>
                            <TabPanel value={tabInfo} index={1}>
                                { address && <Address address={address} admin={data.company_id===user?.company?.id && user.is_admin}/>}
                            </TabPanel>
                            <TabPanel value={tabInfo} index={2}>
                                { staff && <Staff staff={staff}/>}
                            </TabPanel>

                        </Col> 
                        <Col lg={8} className="right-div page-box order-lg-2 order-md-2 order-2">
                        {user?.company?.id == data?.company_id ? (
                            // <Tabs defaultActiveKey="posts" id="companies" className="mb-3" justify>
                            // <Tab eventKey="posts" title="Posts">
                            //     <PostsPrivate user={user} url='../backend/posts/postprivate' slug={slug} displayNew={true}/>
                            // </Tab>
                            // <Tab eventKey="projects" title="Projects">
                            //     <ProjectsList company={data?.company_id}/>
                            // </Tab>
                            // </Tabs>
                            <>
                                <Tabs value={tabContent} onChange={handleTabContent}
                                        indicatorColor="primary" textColor="primary"
                                        scrollButtons="auto" centered
                                        aria-label="scrollable auto tabs example">
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

                        ) : (<> 
                        {/* If user is not member of company! */}
                        <p>You should grant access to view content!</p>
                        {/* <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} */}

                        {console.log(isCompanyNameUnavailable,requested)}
                        <Button disabled={isCompanyNameUnavailable || requested!=='No'} 
                            onClick={sendRequest} 
                            title={isCompanyNameUnavailable ? "" : "You can only be employee on one company"}>
                        {
                            requested === 'P' ? 'Already requested!' : 
                                requested === 'A' ? 'Delete' : 'Send request'
                        }
                        </Button>
                    </>)
                    }
                        </Col> 
                    </Row> 
                </Container> 
            </>
        ) : (<></>
        )}
        </div>
    );
};

export default CompanyProfile;