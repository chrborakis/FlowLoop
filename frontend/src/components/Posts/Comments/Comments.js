import React, { useState, useEffect } from "react";
import {getComments} from "./CommentsUtils";
import NewComment from "./NewComment";
import {Card, Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../../../../static/css/Posts/Comment.css';

const Comments = ({post,url}) => {
    // post: post_id
    // url: ../backend/postpubliccomments OR backend/postpubliccomments

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();

    useEffect( () => {
        getComments( setComments, `${url}/${post}`);
    }, [newComment]);

    return (
        <div>
            {comments ? (
                comments.map( comment => 
                    <div className="comments" key={comment.id}>
                        {/* <div className="uploader">
                            <img src={`/files/${comment.user.image}`} width={60}/>
                            <h4>{comment.user.name}</h4>
                            <h6>{new Date(comment.date).toISOString().split('T')[0]}{new Date(comment.date).toISOString().split('T')[1].split('.')[0]}</h6>
                        </div> */}
                        <Row className="comment">
                            <Col xs={3} className="imagecol">
                                <img src={`/files/${comment.user.image}`}/>
                            </Col>
                            <Col>
                                <div className="user-details">
                                    <h5>{comment.user.name}</h5>
                                </div>
                                <div className="date">
                                    <h6>{new Date(comment.date).toISOString().split('T')[0]}{new Date(comment.date).toISOString().split('T')[1].split('.')[0]}</h6>
                                </div>
                            </Col>
                        </Row> 
                        <div className="content">
                            <p>{comment.comment}</p>
                        </div>
                    </div> 
                //     <Card key={comment.id}>
                //         <Card.Header>
                //         <Row>
                //             <Col xs={1}>
                //                 <div className="user-image">
                //                 <img src={`/files/${comment.user.image}`} width={60}/>
                //                 </div>
                //             </Col>
                //             <Col>
                //                 <div className="user-details">
                //                     <div className="user">
                //                         <Link to={`/user/${comment.user?.slug}`}>
                //                             <h3>{comment.user?.name}</h3>
                //                         </Link>
                //                     </div>
                //                     <div className="date">
                //                         <h6>{new Date(comment.date).toISOString().split('T')[0]}{new Date(comment.date).toISOString().split('T')[1].split('.')[0]}</h6>
                //                     </div>
                //                 </div>
                //             </Col>
                //             </Row>                       
                //         </Card.Header>
                //     <Card.Body>
                //         <Card.Text>
                //             {comment.comment}
                //         </Card.Text>
                //     </Card.Body>
                // </Card>
                )
                ): <div>
                <p>No comments yet!</p>
            </div>
            }
            <hr/>
            <NewComment post={post} onComment={setNewComment} url={url}/>
        </div>
    );
}

export default Comments;