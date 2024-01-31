import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../static/css/HomePage.css'
import PostsPublic from "./Posts/PostsPublic";
import PostsPrivate from "./Posts/PostsPrivate";


const HomePage1 = ({user}) => {
    return (
        <div className="homepage">
            <div className="feed">
                <Tabs defaultActiveKey="public" id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="public" title="Public">
                        <PostsPublic user={user}/>
                    </Tab>
                    {user?.company?.name && 
                        <Tab eventKey="private" title={user?.company?.name}>
                            <PostsPrivate user={user}/>
                        </Tab>
                    }
                </Tabs>
            </div>
        </div>
    );
};

export default HomePage1; 