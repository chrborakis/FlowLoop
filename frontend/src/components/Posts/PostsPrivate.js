import React, {useState,useEffect} from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircleLoader } from 'react-spinners';
import { getPosts } from "./PostUtils";
import { Button } from "@material-ui/core";

import "../../../static/css/Posts/Post.css"

const PostsPrivate = ({user, url, slug}) => {
    // url: ../backend/postprivate OR backend/postprivate

    const [ posts, setPosts] = useState([]);
    const [ newPost, setNewPost] = useState();
    const [ loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const [newPostModal, setNewPostModal] = useState(false);

    const end_message = posts?.length === 0 ? "No posts found!" : "You have seen all posts!"

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
        <Button variant="contained" color="primary" onClick={() => setNewPostModal(true)}>Create new {slug} Post</Button>
        <NewPost user={user} url={url} newPost={setNewPost} show={newPostModal} onHide={() => setNewPostModal(false)}/>  

        <div className="center-posts">
        <InfiniteScroll
            dataLength={posts?.length}
            next={loadMore}
            hasMore={hasNextPage} loader={<div className="loader-container"><CircleLoader color="#36d7b7" /></div>}
            endMessage={<p style={{ textAlign: 'center' }}><b>{end_message}</b></p>}
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
        </div>
    </>);
};

export default PostsPrivate; 