import React, { useState, useEffect } from "react";
import Posts from "./Posts/Posts";
import GetPosts from "./Posts/GetPosts";
import '../../static/css/HomePage.css'

const HomePage = ({user}) => {
    const [ posts, setPosts] = useState([]);

    const [url, setUrl] = useState({
        post:    'postspublic',
        comment: 'publiccomments/',
        like:    'publiclikes/',
    });

    const getPublic  = () => {
        setPosts('');
        setUrl({...url,
            post:    'postspublic',
            comment: 'publiccomments/',
            like:    'publiclikes/',
        });
    };
    const getPrivate = () => {
        setPosts('');
        setUrl({...url,
            post:    `postsprivate/${user.company.id}`,
            comment: 'privatecomments/',
            like:    'privatelikes/',
        });
    };

    useEffect( () => {
        GetPosts({ onFetch: setPosts, url: url.post});
    }, [url.post]);

    return(
        <div className="body">
            {console.log('HomeUrls:', url)}
            <h1>HomePage</h1>
            <div className="changeFeed">
                {console.log(user)}
                <button onClick={getPublic}>Public Feed</button>
                <button onClick={getPrivate}>{user.company.name}</button>
            </div>
            { posts ? (
                <Posts posts={posts} url={url}/>
            ) : (
                <div>
                    <p>Loading posts...</p>
                </div>
            )}
            
        </div>
    )
}

export default HomePage; 