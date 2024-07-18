import React, { useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import {Card, Row,Col} from 'react-bootstrap';
import ProfileImage from '../ProfileImage';

import { replyRequest } from '../../Requests/WorkUtils';
import { get_request, sendWorkRequest} from './CompanyUtils';
import "bootstrap/dist/css/bootstrap.min.css"; 

const CompanyHeader = ({ slug, data, user}) => {
    const [ image, setImage] = useState(data?.image);
    const [requested, setRequested] = useState(false);
    const unemployed = user?.company === null
    useEffect(()=>{setImage(data?.image);}, [data?.image])

    const [requestId, setRequestId] = useState(null)

    useEffect(() => {
        if(data) get_request( user, user?.id, data?.company_id, setRequested, setRequestId)
    }, [ data, slug, requested, sendWorkRequest]);

    const sendRequest = () => {
        const user_data = { "user": user.id, "company": data?.company_id, "status": "P"}
        sendWorkRequest( user_data, setRequested, user?.token)
    };
    const [buttonConfig, setButtonConfig] = useState({ text: 'Send request', variant: 'success', color:'primary'});
    
    useEffect(() => {
        if (requested === 'P') {
            setButtonConfig({ text: 'Already requested!', variant: 'secondary' });
        }else if( requested === 'No' && !unemployed){
            setButtonConfig({ text: 'You can only be employee on one company', variant: 'secondary'})
        }else if( requested === 'A'){
            setButtonConfig({ text: 'Leave Company', variant: 'outlined', color:'error'})
        }
        else if (requested === 'No') {
            setButtonConfig({ text: 'Send Request', variant: 'success' });
        }
      }, [requested]);

    return(<>
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
                                requested !== 'A' ? (
                                    <Button variant={buttonConfig.variant} disabled={!unemployed || requested==='P'}  onClick={sendRequest}>
                                        { buttonConfig.text }
                                    </Button>
                                ) : (
                                    requested === 'A' && (
                                        <Button variant={buttonConfig.variant} onClick={()=>replyRequest( requestId, 'D', null)}>
                                            { buttonConfig.text }
                                        </Button>
                                    )
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Card>
            </div>
    </>)
}

export default CompanyHeader