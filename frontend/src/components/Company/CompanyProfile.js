import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CompanyData from './CompanyData';
import { useAuth } from '../../store/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import PostsPrivate from '../Posts/PostsPrivate';

const CompanyProfile = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const [ data, setData] = useState();

    const [requested, setRequested] = useState(false);

    const isCompanyNameUnavailable = user?.company?.name === undefined || user?.company?.name === null;

    useEffect(() => {
        const get_request = async () => {
            axios.get(`/backend/api/workrequests/${user.id}`
            ).then(  res => {
                if( data?.company_id == res.data.company){
                    setRequested(true)
                }
            }).catch( err => console.log(err))
        };
        if(data) {
            get_request();
        }
    }, [data]);

    const sendWorkRequest = async () => {
        axios.post('/backend/workrequests', {
            "user": user.id,
            "company": data.company_id,
            "status": "P"
        }
        ,{headers: {'X-CSRFToken': Cookies.get('csrftoken')}}
        ).then(  res => {
            setRequested(true)
            console.log(res.data)
            console.log(res.data.work)      //IF WORKS, Update user data in AUTH
        }).catch( err => console.log(err))
    };

    return (
      <div>
        <h1>Company {slug} Profile</h1>
        { data ? (
            <div>
                <div>
                    <h1>{ data.company_name }</h1>
                    <p>{data.description} </p>
                    <p>{data.establishment_date} </p>
                    <p>{data.phone} </p>   
                </div>

                <hr></hr>

                <PostsPrivate />
            </div>
        ) : (
            <CompanyData onfetch={setData} slug={slug}/>
        )}
          
        {/* {user?.company?.name === undefined || user?.company?.name === null ? ( */}
            <button disabled={!isCompanyNameUnavailable || requested} onClick={sendWorkRequest}
                title={isCompanyNameUnavailable ? "" : "You can only be employee on one company"}>
                {requested ? 'Request send...' : <p>Send work request</p>}
            </button>
              
            
          
     
      </div>
    );
};

export default CompanyProfile;