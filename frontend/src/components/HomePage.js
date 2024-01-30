import React, { useState, useEffect } from "react";
import Post from "./Posts/Post";
import GetPosts from "./Posts/GetPosts";
import '../../static/css/HomePage.css'
import NewPost from "./Posts/NewPost";

const HomePage = ({user}) => {
    const [ posts, setPosts] = useState([]);
    const [ newPost, setNewPost] = useState();

    const [loading, setLoading] = useState(false);

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
        console.log(url.post)
        GetPosts({ onFetch: setPosts, url: url.post, setLoading: setLoading});
    }, [url.post]);

    useEffect( () => {  
        if (newPost) {
            console.log('newPost:', newPost);
            setPosts((prevPosts) => [newPost.data, ...prevPosts]);
            console.log('posts:', posts); 
        }
    }, [newPost])

    return(
        <div className="homepage">
        {/* <div className="body"> */}
            <h1>HomePage</h1>
            <div className="changeFeed">
                <button onClick={getPublic}
                    style={{ backgroundColor: url.post === 'postpublic' ? 'green' : 'gray' }}>
                    Public Feed
                </button>
                {user?.company?.name && 
                    <button onClick={getPrivate}
                        style={{ backgroundColor: url.post !== 'postpublic' ? 'green' : 'gray' }}>
                        {user?.company?.name}
                    </button>
                }
            </div>

            <NewPost user={user} url={url.post} newPost={setNewPost}/>

            {loading ?(
                <p>Loading posts...</p>
            ): (
                posts && posts.map( post => 
                    post && <Post key={post.post_id} post={post} url={url}/>
                )
            )}
            
        {/* </div> */}
        </div>
    )
}

export default HomePage; 