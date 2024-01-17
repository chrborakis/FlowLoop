import React, { useState, useEffect } from "react";
import Posts from "./Posts/Posts";
import GetPosts from "./GetPosts";
import '../../static/css/HomePage.css'

const HomePage = ({user}) => {
    const [ posts, setPosts] = useState([]);
    const [url, setUrl] = useState('postspublic');

    const getPublic  = () => setUrl('postspublic');
    const getPrivate = () => setUrl(`postsprivate/${user.company}`);

    useEffect( () => {
        GetPosts({ onFetch: setPosts, url: url});
    }, [url]);

    return(
        <div className="body">
            {console.log(url)}
            <div className="space"></div>
            <h1>HomePage</h1>
            <div className="changeFeed">
                <button onClick={getPublic}>Public Feed</button>
                <button onClick={getPrivate}>Private Feed</button>
            </div>
            {/* <GetPosts onFetch={setPosts} url={url} /> */}
            { posts ? (
                <Posts posts={posts}/>
            ) : (
                <div>
                    <p>Loading posts...</p>
                </div>
            )}
            
        </div>
    )
}

export default HomePage; 