import React, {useState,useEffect} from "react";
import GetPosts from "./GetPosts";
import Post from "./Post";
import NewPost from "./NewPost";
import InfiniteScroll from 'react-infinite-scroll-component';

const PostsPrivate = ({user, url, slug, displayNew}) => {
    // url: ../backend/postprivate OR backend/postprivate

    const [ posts, setPosts] = useState([]);
    const [ newPost, setNewPost] = useState();
    const [ loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect( () => {
        GetPosts({ onFetch: setPosts, url: `${url}/${slug}`, setLoading: setLoading, setHasNextPage:setHasNextPage, currentPage:currentPage});
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

        {loading ?(
            <p>Loading posts...</p>
        ): (
            <InfiniteScroll
                dataLength={posts?.length}
                next={loadMore}
                hasMore={hasNextPage} loader={<h4>Loading...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                // refreshFunction={this.refresh}
                // pullDownToRefresh pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={ <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
                releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
            >
                {posts?.length > 0 ? (
                posts.map( post => 
                    post && <Post key={post.post_id} post={post} url={url}/>
                )
            ) : (
                <p>No Posts Found!</p>
            )}
            </InfiniteScroll>
        )}
    </>);
};

export default PostsPrivate; 