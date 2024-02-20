import React from "react";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
import { Link } from "react-router-dom";
import {Card, Row,Col} from 'react-bootstrap';
import '../../../static/css/Posts/Post.css';

const Post = ({post, url}) => {
    return(
        // <div key={post.post_id} className="card">
        //     <div className="card-title">
        //         <div>
        //             <img src={`/files/${post.user?.user_image}`} width={60}/>
        //             <div>
        //                 { post.user?.company_name && 
        //                     <Link to={`/company/${post.user?.company_slug}`}>
        //                         <h2>{post.user?.company_name}</h2>
        //                     </Link>
        //                 }
        //                     <Link to={`/user/${post.user?.user_slug}`}>
        //                         <h3>{post.user?.user_name}</h3>
        //                     </Link>
        //             </div>
        //         </div>
        //         <p>{post.title}</p>
        //         <div>
        //             <h6>{post.publish_date}</h6>
        //         </div>
        //         {
        //             post.image &&
        //             <div className="container">
        //                 <div className="image-wrapper">
        //                 <img src={post.image} alt=""/>
        //                 </div>
        //             </div>
        //         } 
                
        //     </div>
        //     <div className="card-content">
        //         <p>{post.body}</p>
        //     </div>
        //     <div className="comments">
        //         <hr></hr>

        //         <Likes post={post.post_id} url={`${url}likes/${post.post_id}`}/>
        //         <hr></hr>
        //         <Comments post={post.post_id} url={`${url}comments`}/>
        //     </div>
        // </div>
        <Card className="text-center">
            <Card.Header>
            <Row>
                <Col xs={3}>
                    <div className="user-image">
                    <img src={`/files/${post.user?.user_image}`} width={60}/>
                    </div>
                </Col>
                <Col>
                    <div className="user-details">
                        { post.user?.company_name && <div className="company">
                            <Link to={`/company/${post.user?.company_slug}`}>
                                <h3>{post.user?.company_name}</h3>
                            </Link>
                        </div>}
                        <div className="user">
                            <Link to={`/user/${post.user?.user_slug}`}>
                                <h4>{post.user?.user_name}</h4>
                            </Link>
                        </div>
                    </div>
                </Col>
                </Row>                       
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}
                    {/* <h6>{post.publish_date}</h6> */}
                    <h6>{new Date(post.publish_date).toISOString().split('T')[0]}{new Date(post.publish_date).toISOString().split('T')[1].split('.')[0]}</h6>
                </Card.Title>
                <Card.Text>
                    { post?.image && <div className="container"><div className="image-wrapper">
                        <img src={post.image} alt=""/></div></div>
                    }
                    <p>{post.body}</p>
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