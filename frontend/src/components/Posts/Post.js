import React, {useState, useRef} from "react";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
import { Link } from "react-router-dom";
import {Card, Row,Col, Dropdown, Button, Form} from 'react-bootstrap';
import '../../../static/css/Posts/Post.css';
import {scrollTop} from '../Extra/LinkOnTop';
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { ConfirmDialog } from 'primereact/confirmdialog';

import '../../../static/css/index.css'
import { useAuth } from "../../store/AuthContext";
import { deletePost, editPost } from "./PostUtils";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Change the theme accordingly
import 'primereact/resources/primereact.min.css';
import { Company } from "../Profiles/Profile";

       
const Post = ({post, url, setPosts}) => {
    const { user} = useAuth();
    const [visible,setVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [data, setData] = useState({"post_id": post.post_id,"title":post.title,"body":post.body})
    

    //Dropdown on delete confirm message
    const accept = () => {
        deletePost( url, post.post_id, setPosts)
        setVisible(false);
    };
    const reject = () => setVisible(false);    


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({...data,[name]: value,});
    };

    const handleEdit = () => {
        setEditMode((prev)=>!prev)
    }

    const [postOpts, setPostOpts] = useState(false);
    const toggleDropdown = () => setPostOpts(!postOpts);

    const saveEdited = (e) => {
        e.preventDefault()
        console.log(data)
        editPost( url, data, setPosts, setEditMode)
    }


    return(
        <Card className="card-content">
            <Card.Header>

            <Row className="align-items-center">
                <Col className="d-flex justify-content-start">
                    <Col xs={3}>
                        <img src={`/files/${post.user?.user_image}`} width={60}/>
                    </Col>
                    <Col xs={9}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-start">
                                { post.user?.company_name && 
                                    <Company company={{name:post.user?.company_name, slug:post.user?.company_slug}}/>
                                }
                            </Col>
                            <Col xs={12}className="d-flex justify-content-start">
                                <Link to={`/user/${post.user?.user_slug}`} onClick={scrollTop}>
                                    {post.user?.user_name}
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Col>

                <Col className="d-flex justify-content-end">
                    {parseInt(post.user?.user_id) === parseInt(user.id) && 
                        <Dropdown show={postOpts} onToggle={toggleDropdown}>
                            <Dropdown.Toggle variant="secondary"><HiMiniCog6Tooth /></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Button variant="outline-info"   onClick={handleEdit}>Edit</Button>
                                <Button variant="outline-danger" icon="pi pi-check"
                        label="Confirm" onClick={() => setVisible(true)}>Delete</Button>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    <ConfirmDialog visible={visible} onHide={() => setVisible(false)}
                        message="Are you sure you want to delete this post?" header="Delete Post"
                        icon="pi pi-exclamation-triangle" accept={accept} reject={reject}
                    />
                </Col>
            </Row>                      
            </Card.Header>
            <Card.Body>
                <Form onSubmit={saveEdited}>
                    <Card.Title>
                        <Row className="align-items-center">
                            {editMode ? (
                                <Form.Control name="title" type="text" disabled={!editMode}
                                    placeholder="Enter a title"
                                    value={data.title} onChange={handleInputChange} required  
                                />
                            ) : (<Col>{data.title}</Col>)}
                        </Row>
                    </Card.Title>
                    <Card.Text>
                        {editMode ? (
                            <Form.Control name="body" type="text" as="textarea" rows={3}  disabled={!editMode}
                                placeholder="Enter your Description" 
                                value={data.body} onChange={handleInputChange} required  
                            />
                        ) : (<>{data.body}</>)}
                        { !editMode && post?.image && 
                            <div className="image-wrapper">
                                <img src={post.image} style={{ maxWidth: '50%' }} />
                            </div>

                        }
                        <p className="post-date">{new Date(post.publish_date).toISOString().split('T')[0]} - {new Date(post.publish_date).toISOString().split('T')[1].split('.')[0]}</p>
                    </Card.Text>
                    {editMode && (
                        <Col className="justify-content-between">
                        <Button variant="outline-danger" type="button" onClick={handleEdit}disabled ={!editMode}>
                            Cancel
                        </Button> 
                        <Button variant="success" type="submit" disabled ={!editMode}>
                            Save
                        </Button>   
                        </Col>
                    )}
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
            <div className="comments">
                <Likes post={post.post_id} url={`${url}likes/${post.post_id}`}/>
                <hr></hr>
                <Comments post={post.post_id} url={`${url}comments`}/>
            </div>
            </Card.Footer>
        </Card>
    )
}

export default Post;