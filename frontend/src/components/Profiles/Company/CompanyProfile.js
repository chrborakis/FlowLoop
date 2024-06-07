import React, { useContext, useState, useEffect} from 'react';
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
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import {Card, Row,Col, Container} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 
import ProfileImage from '../ProfileImage';
// import '../../../../static/css/Profile/Profile.css';

const CompanyProfile = () => {
    const { user, updateUser } = useAuth();
    const { slug, content } = useParams();

    console.log(slug,content)

    const [ data, setData] = useState();
    const [ address, setAddress] = useState();
    const [ staff, setStaff] = useState([]);
    const [ image, setImage] = useState(data?.image);

    const [tabInfo, setTabInfo] = useState(0);
    const handleTabInfo = (event, newTabContent) => setTabInfo(newTabContent);

    
    const [tabContent, setTabContent] = useState(0);
    // console.log(tabContent)
    const handleTabContent = (event, newTabContent) => setTabContent(newTabContent);

    const [requested, setRequested] = useState(false);

    const unemployed = user?.company === null
        

    useEffect( () => {getCompany(setData, slug)}, [slug]);

    useEffect(()=>{setImage(data?.image);}, [data?.image])

    useEffect( () => {
        if(data?.company_id) {
            getAddress(data?.address, setAddress)
            getStaff(  data?.company_id, setStaff)
        }
    },[data?.company_id,slug])

    useEffect(() => {
        if(data) get_request( user, user?.id, data?.company_id, setRequested)
    }, [ data, slug, requested, sendWorkRequest]);

    const sendRequest = () => {
        const user_data = { "user": user.id, "company": data?.company_id, "status": "P"}
        sendWorkRequest( user_data, setRequested, user?.token)
    };
    const [buttonConfig, setButtonConfig] = useState({ text: 'Send request', variant: 'success' });
    
    useEffect(() => {
        console.log(requested, unemployed)
        if (requested === 'P') {
            setButtonConfig({ text: 'Already requested!', variant: 'secondary' });
        }else if( requested === 'No' && !unemployed){
            setButtonConfig({ text: 'You can only be employee on one company', variant: 'danger'})
        }
        else if (requested === 'No') {
            setButtonConfig({ text: 'Send Request', variant: 'success' });
        }
        console.log("REQUESTED -> ", requested)
      }, [requested]);

    return (
        <div>
        { data ? (
            <> 
                <div className="d-flex justify-content-center">
                    <Card className="d-flex justify-content-center"style={{ borderRadius: '0.25rem', width:'450px'}}>
                        <Row className="d-flex justify-content-center">
                            <Col className="d-flex justify-content-start">
                                <ProfileImage url={'companies'} id={data?.company_id} image={image} setImage={setImage}/>
                            </Col>
                            <Col>
                                <Row className="text-center d-flex justify-content-center">
                                    {data.company_name}
                                </Row>
                                <Row className="text-center d-flex justify-content-center">
                                    {
                                        requested !== 'A' && (
                                            <Button variant={buttonConfig.variant} disabled={!unemployed || requested==='P'}  onClick={sendRequest}>
                                                { buttonConfig.text }
                                            </Button>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <div className="d-flex justify-content-center profile_data">
                        <Col className="page-box order-lg-1 order-md-1 order-1">
                            <Tabs value={tabInfo} onChange={handleTabInfo}
                                        indicatorColor="primary" textColor="primary" centered
                                        aria-label="scrollable auto tabs example">
                                    <Tab label="Information"/>
                                    <Tab label="Address"/>
                                    <Tab label={`Staff (${staff.length})`}/>
                            </Tabs>
                            <TabPanel value={tabInfo} index={0}>
                                { data    && <Info company={data} admin={data?.company_id===user?.company?.id && user.is_admin} token={user?.token}/>}
                            </TabPanel>
                            <TabPanel value={tabInfo} index={1}>
                                <Address company_id={data?.company_id} address={address} admin={data.company_id===user?.company?.id && user.is_admin} token={user?.token}/>
                            </TabPanel>
                            <TabPanel value={tabInfo} index={2}>
                                { staff && <Staff staff={staff}/>}
                            </TabPanel>
                        </Col> 
                        <Col className="page-box order-lg-2 order-md-2 order-2">
                            {user?.company?.id == data?.company_id ? (
                                <>
                                    <Tabs value={tabContent} onChange={handleTabContent}indicatorColor="primary" textColor="primary"scrollButtons="auto" centeredaria-label="scrollable auto tabs example">
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