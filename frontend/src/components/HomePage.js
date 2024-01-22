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
    };
    const getPrivate = () => {
        setPosts('');
        setUrl({...url,
            post:    `postprivate/${user.company.id}`,
            comment: 'privatecomments/',
            like:    'privatelikes/',
        });
    };

    useEffect( () => {
        console.log(url.post)
        GetPosts({ onFetch: setPosts, url: url.post, setLoading: setLoading});
    }, [url.post]);


    return(
        <div className="body">
            <h1>HomePage</h1>
            <div className="changeFeed">
                {console.log(user)}
                <button onClick={getPublic}>Public Feed</button>
                <button onClick={getPrivate}>{user.company.name}</button>
            </div>

            {loading ?(
                <p>Loading posts...</p>
            ): (
                posts.map( post => 
                    <Post key={post.id} post={post} url={url}/>
                )
            )}
            
        </div>
    )
}

export default HomePage; 