import React, { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, get_request, sendWorkRequest, getAddress, getStaff } from './CompanyUtils';

import { useAuth }    from '../../../store/AuthContext';
import { RequestContext, useReq } from '../../../store/RequestContext';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostsPrivate from '../../Posts/PostsPrivate';
import Info from './Info/Info';
import Address from './Info/Address';
import Staff from './Info/Staff';
import ProjectsList from './Projects/ProjectsList';

import {Card, Row,Col, Container,Button} from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import "bootstrap/dist/css/bootstrap.min.css"; 

// import '../../../../static/css/Profile/Profile.css';

const CompanyProfile = () => {
    // const { addRequest } = useReq();   
    const { user, updateUser } = useAuth();
    const { slug } = useParams();

    const [ data, setData] = useState();
    const [ address, setAddress] = useState();

    const [ staff, setStaff] = useState([]);

    const [requested, setRequested] = useState(false);
    const isCompanyNameUnavailable = user?.company?.name === undefined || user?.company?.name === null;

    useEffect( () => {getCompany(setData, slug)}, [slug]);
    
    useEffect( () => {
        if(data?.company_id) {
            getAddress(data?.company_id, setAddress)
            getStaff(  data?.company_id, setStaff)
        }
    },[data?.company_id,slug])

    useEffect(() => {
        console.log(slug, requested, data)
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
                <div className='preview'>
                    <div className="image">
                        <img src={data?.image ? data?.image : "/files/company_image/dummy.png"} width={150}/>
                    </div>
                    <div className="name">
                        <h3>{data.company_name}</h3>
                    </div>
                </div>

                <Container fluid className="mt-5"> 
                    <Row className="justify-content-center"> 
                        <Col lg={4} className="left-div page-box order-lg-1 order-md-1 order-1">
                            <Tabs defaultActiveKey="basic-info" id="justify-tab-example" className="mb-3" justify>
                                <Tab eventKey="basic-info" title="Company Info">
                                    { data    && <Info company={data} admin={data.company_name===user.company.name && user.is_admin}/>}
                                </Tab>
                                <Tab eventKey="address" title="Address">
                                    { address && <Address address={address} admin={data.company_name===user.company.name && user.is_admin}/>}
                                </Tab>
                                <Tab eventKey="staff" title={`Staff (${staff.length})`}>
                                    { staff && <Staff staff={staff}/>}
                                </Tab>
                            </Tabs>
                        </Col> 
                        <Col lg={8} className="right-div page-box order-lg-2 order-md-2 order-2">
                        {user?.company?.id == data?.company_id ? (
                            <Tabs defaultActiveKey="posts" id="companies" className="mb-3" justify>
                            <Tab eventKey="posts" title="Posts">
                                <PostsPrivate user={user} url='../backend/posts/postprivate' slug={slug} displayNew={true}/>
                            </Tab>
                            <Tab eventKey="projects" title="Projects">
                                <ProjectsList company={data?.company_id}/>
                            </Tab>
                            </Tabs>
                        ) : (<> 
                        {/* If user is not member of company! */}
                        <p>You should grant access to view content!</p>
                        {/* <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} */}

                        <Button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} title={isCompanyNameUnavailable ? "" : "You can only be employee on one company"}>
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