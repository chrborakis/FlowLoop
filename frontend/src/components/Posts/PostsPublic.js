import React, {useState,useEffect,useRef } from "react";
import GetPosts from "./GetPosts";
import Post from "./Post";
import NewPost from "./NewPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircleLoader } from 'react-spinners';
import { getPosts } from "./PostUtils";
import { Container, Row, Col, Button } from 'react-bootstrap';

import "../../../static/css/Posts/Post.css"

const PostsPublic = ({user, url, slug, displayNew}) => {
    // url: ../backend/postpublic OR backend/postpublic
    const [ posts, setPosts] = useState([]);
    const [ newPost, setNewPost] = useState();
    const [ loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect( () => {
        getPosts(setPosts, url+slug, setLoading, setHasNextPage, currentPage)
    }, [slug, currentPage]);

    useEffect( () => {  
        if (newPost) {
            console.log('newPost:', newPost);
            setPosts((prevPosts) => [newPost.data, ...prevPosts]);
        }
    }, [newPost])

    const loadMore = () => {
        if (hasNextPage && !loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (<>
        { displayNew && <NewPost user={user} url={url} newPost={setNewPost}/>}

        <div className="center-posts">
            <InfiniteScroll
                dataLength={posts?.length}
                next={loadMore}
                hasMore={hasNextPage} loader={<div className="loader-container"><CircleLoader color="#36d7b7" /></div>}
                endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                // refreshFunction={this.refresh}
                // pullDownToRefresh pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={<div style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</div>}
            releaseToRefreshContent={<div style={{ textAlign: 'center' }}>&#8593; Release to refresh</div>}
            >
                {posts.map( post => 
                    post && <Post key={post.post_id} post={post} url={url} setPosts={setPosts}/>
                )}
            </InfiniteScroll>
        </div>
    </>);
};

export default PostsPublic; 