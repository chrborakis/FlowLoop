import React, {useState,useEffect} from "react";
import GetPosts from "./GetPosts";
import Post from "./Post";
import NewPost from "./NewPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircleLoader } from 'react-spinners';

import { getPosts } from "./PostUtils";

const PostsPrivate = ({user, url, slug, displayNew}) => {
    // url: ../backend/postprivate OR backend/postprivate

    const [ posts, setPosts] = useState([]);
    const [ newPost, setNewPost] = useState();
    const [ loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect( () => {
        // GetPosts({ onFetch: setPosts, url: `${url}/${slug}`, setLoading: setLoading, setHasNextPage:setHasNextPage, currentPage:currentPage});
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
        { displayNew && <NewPost user={user} url={url} newPost={setNewPost}/>}

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
                post && <Post key={post.post_id} post={post} url={url}/>
            )
        ) : (
            <p>No Posts Found!</p>
        )}
        </InfiniteScroll>
    </>);
};

export default PostsPrivate; 