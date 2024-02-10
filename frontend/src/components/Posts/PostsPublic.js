import React, {useState,useEffect} from "react";
import GetPosts from "./GetPosts";
import Post from "./Post";
import NewPost from "./NewPost";

const PostsPublic = ({user, url, slug, displayNew}) => {
    // url: ../backend/postpublic OR backend/postpublic

    const [ posts, setPosts] = useState([]);
    const [ newPost, setNewPost] = useState();
    const [ loading, setLoading] = useState(false);

    useEffect( () => {
        GetPosts({ onFetch: setPosts, url: url+slug, setLoading: setLoading});
    }, [slug]);

    useEffect( () => {  
        if (newPost) {
            console.log('newPost:', newPost);
            setPosts((prevPosts) => [newPost.data, ...prevPosts]);
            console.log('posts:', posts); 
        }
    }, [newPost])

    return (<>
        { displayNew && <NewPost user={user} url={url} newPost={setNewPost}/>}

        {loading ?(
            <p>Loading posts...</p>
        ): (
            posts?.length > 0 ? (
                posts.map( post => 
                    post && <Post key={post.post_id} post={post} url={url}/>
                )
            ) : (
                <p>No Posts Found!</p>
            )
        )}
    </>);
};

export default PostsPublic; 