import React, { useState, useEffect } from "react";
import {getComments} from "./CommentsUtils";
import NewComment from "./NewComment";
import {Card, Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../../../../static/css/Posts/Comment.css';

import { scrollTop } from "../../Extra/LinkOnTop";

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
                                    <Link to={`/user/${comment.user.slug}`} onClick={scrollTop}>
                                        <h5>{comment.user.name}</h5>
                                    </Link>
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