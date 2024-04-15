import axios from 'axios';
import Cookies from 'js-cookie';

export const getPosts = async(setPosts, url, setLoading, setHasNextPage, currentPage) => {
    setLoading(true);
    const page_url = url+"/?page="+currentPage;
    axios.get(page_url.trim())
    .then(  res => {
        if( res.data.status === 200){
            setPosts(prevPosts => [...prevPosts, ...res.data.data]);
            setHasNextPage(res.data.has_next);
            // onFetch(res.data.data);
        }})
    .catch( err => {
        setLoading(false);
        console.log(err)})
    .finally( err => setLoading(false))
}


export const deletePost = async( url, post, setPosts) => {
    await axios.delete(`${url}/${post}/`,
    {method: 'DELETE',headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data)
        if(res.data.status === 200){
            setPosts(prevData => prevData.filter(obj => obj.post_id !== post));
        }
    })
    .catch( err => console.log(err))
}

export const editPost = async( url, post, setPosts, setEditMode) => {
    await axios.patch(`${url}/${post.post_id}/`, post, 
    {headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .then( res => {
        console.log(res.data.data)
        if(res.data.status === 200){
            setEditMode(false)    
            // setPosts(prevData =>prevData.map(post => (post.post_id === post.post_id ? { ...post, value: res.data.data } : post)));        
        }
    })
    .catch( err => console.log(err))
}

export const postPost = async( url, data, newPost, setIsContentVisible) => {
    console.log("New Post: ", data)
    const new_url = url + '/0/'
    await axios.post(new_url, data,{
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'multipart/form-data'
    }})
    .then(  res => {
        console.log("New Post res.data: ", res.data)
        newPost(res.data);
        setIsContentVisible(false)
    }).catch( err => console.log(err))  
}