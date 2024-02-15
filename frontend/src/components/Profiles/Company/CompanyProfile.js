import React, { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, get_request, sendWorkRequest } from './CompanyUtils';

import { useAuth }    from '../../../store/AuthContext';
import { RequestContext, useReq } from '../../../store/RequestContext';

import PostsPrivate from '../../Posts/PostsPrivate';
import Info from './Info';

const CompanyProfile = () => {
    // const { addRequest } = useReq();   

    const { user } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();

    const [requested, setRequested] = useState(false);
    const isCompanyNameUnavailable = user?.company?.name === undefined || user?.company?.name === null;

    useEffect( () => {getCompany(setData, slug)}, [slug]);

    useEffect(() => {
        if(data) get_request( user, user?.id, data?.company_id, setRequested);
    }, [slug, data, requested]);

    const sendRequest = () => sendWorkRequest( user.id, data?.company_id, setRequested);

    return (
        <div>
        <h1>Company {slug} Profile</h1>
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

                <div className="page">
                    <div className="left-side">
                        {data && <Info data={data} />}
                    </div>
                    <div className="right-side">
                    {user?.company?.id == data?.company_id ? (
                        <PostsPrivate user={user} url='../backend/postprivate' slug={slug} displayNew={requested==='A'}/>
                    ) : (<>
                        {/* If user is not member of company! */}
                        <p>You should grant access to view content!</p>
                        <button disabled={!isCompanyNameUnavailable || requested!=='No'} onClick={sendRequest}
                            title={isCompanyNameUnavailable ? "" : "You can only be employee on one company"}>
                            {'Send work request'}
                            {requested === 'P' && 'Arleady requested!'}
                        </button> </>
                    )}
                    </div>
                </div>
            </>
        ) : (<></>
        )}
        </div>
    );
};

export default CompanyProfile;