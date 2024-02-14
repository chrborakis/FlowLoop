import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PostsPublic from "./Posts/PostsPublic";
import PostsPrivate from "./Posts/PostsPrivate";

import '../../static/css/HomePage.css'

const HomePage = ({user}) => {
    return (
        <div className="homepage">
            <div className="feed">
                <Tabs defaultActiveKey="public" id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="public" title="Public">
                        <PostsPublic user={user} url='backend/postpublic' slug='/0' displayNew={true}/>
                    </Tab>
                    {user?.company?.name && 
                        <Tab eventKey="private" title={user?.company?.name}>
                            <PostsPrivate user={user} url='backend/postprivate' slug={user.company.slug} displayNew={true}/>
                        </Tab>
                    }
                </Tabs>
            </div>
        </div>
    );
};

export default HomePage; 