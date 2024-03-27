import React, { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, get_request, sendWorkRequest } from './CompanyUtils';

import { useAuth }    from '../../../store/AuthContext';
import { RequestContext, useReq } from '../../../store/RequestContext';

import PostsPrivate from '../../Posts/PostsPrivate';
import Info from './Info';
import { Container, Row, Col, Card } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

const CompanyProfile = () => {
    // const { addRequest } = useReq();   

    const { user, updateUser } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();

    const [requested, setRequested] = useState(false);
    const isCompanyNameUnavailable = user?.company?.name === undefined || user?.company?.name === null;

    useEffect( () => {getCompany(setData, slug)}, [slug]);

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
                        <Col xs={12} md={6} lg={4} className="page-box order-lg-1 order-md-1 order-1">
                            {data && <Info data={data} />}
                        </Col> 
                        <Col xs={12} md={6} lg={4} className="page-box order-lg-2 order-md-2 order-2">
                        {user?.company?.id == data?.company_id ? (
                        <PostsPrivate user={user} url='../backend/postprivate' slug={slug} displayNew={true}/>
                    ) : (<>
                        {/* If user is not member of company! */}
                        <p>You should grant access to view content!</p>
                        {/* <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} */}

                        <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} title={isCompanyNameUnavailable ? "" : "You can only be employee on one company"}>
                        {
                            requested === 'P' ? 'Already requested!' : 
                                requested === 'A' ? 'Delete' : 'Send request'
                        }
                        </button>
                    </>)
                    }
                        </Col> 
                    </Row> 
                </Container> 

                {/* <div className="page">
                    <div className="left-side">
                        {data && <Info data={data} />}
                    </div>
                    <div className="right-side">
                    {user?.company?.id == data?.company_id ? (
                        <PostsPrivate user={user} url='../backend/postprivate' slug={slug} displayNew={true}/>
                    ) : (<>
                        {/* If user is not member of company! */}
                        {/* <p>You should grant access to view content!</p> */}
                        {/* <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} */}

                        {/* <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest} title={isCompanyNameUnavailable ? "" : "You can only be employee on one company"}> */}
                        {/* { */}
                            {/* requested === 'P' ? 'Already requested!' :  */}
                                {/* requested === 'A' ? 'Delete' : 'Send request' */}
                        {/* } */}
                        {/* </button> */}
                    {/* </>) */}
                    {/* } */}
                    {/* </div> */}
                {/* </div> */} 
            </>
        ) : (<></>
        )}
        </div>
    );
};

export default CompanyProfile;