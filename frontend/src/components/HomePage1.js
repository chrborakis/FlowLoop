import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PostsPublic from "./Posts/PostsPublic";
import PostsPrivate from "./Posts/PostsPrivate";

import '../../static/css/HomePage.css'

const HomePage1 = ({user}) => {
    return (
        <div className="homepage">
            <div className="feed">
                <Tabs defaultActiveKey="public" id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="public" title="Public">
                        <PostsPublic user={user} url='backend/postpublic' slug='/0'/>
                    </Tab>
                    {user?.company?.name && 
                        <Tab eventKey="private" title={user?.company?.name}>
                            <PostsPrivate user={user} url='backend/postprivate'/>
                        </Tab>
                    }
                </Tabs>
            </div>
        </div>
    );
};

export default HomePage1; 