import React, { useState, useEffect } from "react";
import Post from "./Posts/Post";
import GetPosts from "./Posts/GetPosts";
import '../../static/css/HomePage.css'

const HomePage = ({user}) => {
    const [ posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [url, setUrl] = useState({
        post:    'postpublic',
        comment: 'publiccomments/',
        like:    'publiclikes/',
    });

    const getPublic  = () => {
        setPosts('');
        setUrl({...url,
            post:    'postpublic',
            comment: 'publiccomments/',
            like:    'publiclikes/',
        });
        setLoading(true);
    };
    const getPrivate = () => {
        setPosts('');
        setUrl({...url,
            post:    `postprivate/${user.company.id}`,
            comment: 'privatecomments/',
            like:    'privatelikes/',
        });
        setLoading(true);
    };

    useEffect( () => {
        GetPosts({ onFetch: setPosts, url: url.post, setLoading: setLoading});
    }, [url.post]);


    return(
        <div className="homepage">
        {/* <div className="body"> */}
            <h1>HomePage</h1>
            <div className="changeFeed">
                <button onClick={getPublic}
                    style={{ backgroundColor: url.post === 'postpublic' ? 'green' : 'gray' }}>
                    Public Feed
                </button>
                <button onClick={getPrivate}
                    style={{ backgroundColor: url.post !== 'postpublic' ? 'green' : 'gray' }}>
                    {user.company.name}
                </button>
            </div>

            {loading ?(
                <p>Loading posts...</p>
            ): (
                posts.map( post => 
                    <Post key={post.post_id} post={post} url={url}/>
                )
            )}
            
        {/* </div> */}
        </div>
    )
}

export default HomePage; 