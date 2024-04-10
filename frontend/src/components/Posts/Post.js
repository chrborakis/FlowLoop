import React from "react";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
import { Link } from "react-router-dom";
import {Card, Row,Col} from 'react-bootstrap';
import '../../../static/css/Posts/Post.css';
import {scrollTop} from '../Extra/LinkOnTop';

import '../../../static/css/index.css'
       
const Post = ({post, url}) => {
    return(
        <Card className="card-content">
            <Card.Header>
            <Row>
                <Col xs={3}>
                    {/* <div className="user-image"> */}
                        <img src={`/files/${post.user?.user_image}`} width={60}/>
                    {/* </div> */}
                </Col>
                <Col>
                    <div className="user-details">
                        { post.user?.company_name && <div className="company">
                            <Link to={`/company/${post.user?.company_slug}`} onClick={scrollTop}>
                                <h3>{post.user?.company_name}</h3>
                            </Link>
                        </div>}
                        <div className="user">
                            <Link to={`/user/${post.user?.user_slug}`} onClick={scrollTop}>
                                <h4>{post.user?.user_name}</h4>
                            </Link>
                        </div>
                    </div>
                </Col>
                </Row>                       
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <p className="post-title">{post.title}</p>
                    <p className="post-date">{new Date(post.publish_date).toISOString().split('T')[0]} - {new Date(post.publish_date).toISOString().split('T')[1].split('.')[0]}</p>
                </Card.Title>
                <Card.Text>
                    { post?.image && <div className="container">
                        <div className="image-wrapper">
                        <img src={post.image} alt=""/></div>
                        </div>
                    }
                    {post.body}
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