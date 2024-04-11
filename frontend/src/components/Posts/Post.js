import React, {useState, useRef} from "react";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
import { Link } from "react-router-dom";
import {Card, Row,Col, Dropdown, Button, Toast} from 'react-bootstrap';
import '../../../static/css/Posts/Post.css';
import {scrollTop} from '../Extra/LinkOnTop';
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { ConfirmDialog } from 'primereact/confirmdialog';

import '../../../static/css/index.css'
import { useAuth } from "../../store/AuthContext";
import { deletePost } from "./PostUtils";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Change the theme accordingly
import 'primereact/resources/primereact.min.css';
       
const Post = ({post, url, setPosts}) => {
    const { user} = useAuth();
    const [visible,setVisible] = useState(false)
    
    const accept = () => {
        deletePost( url, post.post_id, setPosts)
        setVisible(false);
    };
    
      const reject = () => {
        setVisible(false);
      };
    

    const [postOpts, setPostOpts] = useState(false);
    const toggleDropdown = () => setPostOpts(!postOpts);

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
                                    <Link to={`/company/${post.user?.company_slug}`} onClick={scrollTop}>
                                        {post.user?.company_name}
                                    </Link>
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
                                <Button variant="outline-info"   onClick={()=>null}>Edit</Button>
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
                <Card.Title>
                    <p className="post-title">{post.title}</p>
                </Card.Title>
                <Card.Text>
                    {post.body}
                    { post?.image && <div className="container">
                        <div className="image-wrapper">
                        <img src={post.image} alt=""/></div>
                        </div>
                    }
                    <p className="post-date">{new Date(post.publish_date).toISOString().split('T')[0]} - {new Date(post.publish_date).toISOString().split('T')[1].split('.')[0]}</p>
                </Card.Text>
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