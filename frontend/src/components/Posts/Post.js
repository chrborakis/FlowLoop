import React, {useState, useRef, useEffect} from "react";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
import { Link } from "react-router-dom";
import {Card, Row,Col, Dropdown, Form} from 'react-bootstrap';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {scrollTop} from '../Extra/LinkOnTop';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../store/AuthContext";
import { TextField } from "@material-ui/core";
import { deletePost, editPost } from "./PostUtils";
import { Company } from "../Profiles/Profile";
import IconButton from '@mui/material/IconButton';
import '../../../static/css/index.css'
import PostActions from "./PostActions";

// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/saga-blue/theme.css'; // Change the theme accordingly
// import 'primereact/resources/primereact.min.css';
import '../../../static/css/Posts/Post.css';
       
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
        <Card className="card-content card">
            <Card.Header className="header">

            <Row className="align-items-center">
                <Col className="d-flex justify-content-start">
                    <Col xs={3}>
                        <img src={`/files/${post.user?.user_image}`} style={{ width: '60px', height: '60px', borderRadius:'50%' }} />
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
                    {parseInt(post.user?.user_id) === parseInt(user?.id) && 
                        <Dropdown show={postOpts} onToggle={toggleDropdown}>
                            <Dropdown.Toggle style={{ backgroundColor: 'transparent',border: 'none'}}>
                                <IconButton aria-label="Example">
                                <FontAwesomeIcon icon={faEllipsisV} />
                                </IconButton>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <ButtonGroup orientation="vertical" className="w-100" aria-label="Vertical button group">
                                    <Button variant="outlined" color="primary" className="w-100" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error" className="w-100" icon="pi pi-check" label="Confirm" onClick={() => setVisible(true)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
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
                                <TextField label="Title" variant="standard" disabled={!editMode}
                                    placeholder="Enter a post title" name="title"
                                    value={data.title} required multiline fullWidth 
                                    onChange={handleInputChange} className="textfield"       
                                />
                            ) : (<Col>{data.title}</Col>)}
                        </Row>
                    </Card.Title>
                    <Card.Text>
                        {editMode ? (
                            <TextField label="Description" variant="standard" disabled={!editMode}
                                placeholder="Enter a post Description" name="body"
                                value={data.body} required multiline fullWidth
                                onChange={handleInputChange} className="textfield"      
                            />
                        ) : (<>{data.body}</>)}
                        { !editMode && (
                                <div className="image-wrapper">
                                    <img src={post?.image} style={{ maxWidth: '50%' }} />
                                </div>
                        )}
                        <p className="post-date">{new Date(post.publish_date).toISOString().split('T')[0]} - {new Date(post.publish_date).toISOString().split('T')[1].split('.')[0]}</p>
                    </Card.Text>
                    {editMode && (
                        <Col className="justify-content-between">
                        <Button variant="plain" color="error" type="button" onClick={handleEdit}disabled ={!editMode}>
                            Cancel
                        </Button> 
                        <Button variant="contained" color="success" type="submit" disabled ={!editMode}>
                            Save
                        </Button>   
                        </Col>
                    )}
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <PostActions url={url} post={post}/>
            </Card.Footer>
        </Card>
    )
}

export default Post;