import React, {useState,useEffect} from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircleLoader } from 'react-spinners';
import { Row, Col } from "react-bootstrap";
import { getPosts } from "./PostUtils";

import "../../../static/css/Posts/Post.css"

const PostsPrivate = ({user, url, slug, displayNew}) => {
    // url: ../backend/postprivate OR backend/postprivate

    const [ posts, setPosts] = useState([]);
    const [ newPost, setNewPost] = useState();
    const [ loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect( () => {
        getPosts(setPosts, `${url}/${slug}`, setLoading, setHasNextPage, currentPage)
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
        <Row className="center-posts">
                <Col>
                    {displayNew && <NewPost user={user} url={url} newPost={setNewPost} />}
                </Col>
            </Row>

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
            {posts?.length > 0 ? (
            posts.map( post => 
                post && <Post key={post.post_id} post={post} url={url} setPosts={setPosts}/>
            )
        ) : (
            <p>No Posts Found!</p>
        )}
        </InfiniteScroll>
    </>);
};

export default PostsPrivate; 