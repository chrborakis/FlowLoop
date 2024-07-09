import axios from 'axios';
import Cookies from 'js-cookie';

export const getPosts = async(setPosts, url, setLoading, setHasNextPage, currentPage) => {
    setLoading(true);
    const page_url = url+"/?page="+currentPage;
    axios.get(`${window.location.origin}/${page_url.trim()}`)
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


export const deletePost = async( url, post, setPosts, token) => {
    await axios.delete(`${window.location.origin}/${url}/${post}/`,
    {method: 'DELETE',headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then( res => {
        if(res.data.status === 200){
            setPosts(prevData => prevData.filter(obj => obj.post_id !== post));
        }
    })
    .catch( err => console.log(err))
}

export const editPost = async( url, post, setPosts, setEditMode, token) => {
    const new_url = `${url}/${post.post_id}/`
    await axios.patch(`${window.location.origin}/${new_url}`, post, 
    {headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'application/json'}})
    .then( res => {
        console.log(res.data)
        if(res.status === 200){
            setPosts(prevData =>prevData.map(post => (post.post_id === post.post_id ? { ...post, value: res.data.data } : post)));        
            setEditMode(false)    
        }
    })
    .catch( err => console.log(err))
}

export const postPost = async( url, data, newPost, onHide, setErrors, setFormData, token) => {
    const new_url = url + '/0/'   
    await axios.post(`${window.location.origin}/${new_url}`, data,{
        headers: {'X-CSRFToken': Cookies.get('csrftoken'),'Authorization': token,'Content-Type': 'multipart/form-data'}})
    .then(  res => {
        if(res.status === 200){
            newPost(res.data);
            setFormData({ title: '', description: '', image: null})
            onHide()
        }else{
            const errorData = res.data;
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                Object.keys(prevErrors).forEach(key => {
                    updatedErrors[key] = errorData[key] || prevErrors[key];
                });
                return updatedErrors;
            });
        }
    }).catch( err => console.log(err))  
}