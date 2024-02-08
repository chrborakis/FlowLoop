import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, get_request, sendWorkRequest } from './CompanyUtils';
import { useAuth } from '../../store/AuthContext';

import Cookies from 'js-cookie';
import axios from 'axios';
import PostsPrivate from '../Posts/PostsPrivate';
import Info from './Info';

const CompanyProfile = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();

    const [requested, setRequested] = useState(false);
    const isCompanyNameUnavailable = user?.company?.name === undefined || user?.company?.name === null;

    useEffect( () => {getCompany(setData, slug)}, []);

    useEffect(() => {
        if(data) get_request(user?.id, data?.company_id, setRequested);
    }, [data]);

    const sendRequest = () => sendWorkRequest( user.id, data?.company_id, setRequested);

    return (
      <div>
        <h1>Company {slug} Profile</h1>

        {data && <Info data={data} />}

        {/* If user is member of company! */}
        <hr></hr>
        {user?.company?.id == data?.company_id ? (
            <PostsPrivate user={user} url='../backend/postprivate' slug={slug}/>
        ) : (<>
            {/* If user is not member of company! */}
            <p>You should grant access to view content!</p>
            <button disabled={!isCompanyNameUnavailable || requested} onClick={sendRequest}
                title={isCompanyNameUnavailable ? "" : "You can only be employee on one company"}>
                {requested ? 'Request send...' : <p>Send work request</p>}
            </button> </>
        )}
                   
      </div>
    );
};

export default CompanyProfile;