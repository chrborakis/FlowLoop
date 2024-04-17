import React, { useState, useEffect } from "react";
import {getComments} from "./CommentsUtils";
import NewComment from "./NewComment";
import {Card, Row,Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../../../../static/css/Posts/Comment.css';

import { scrollTop } from "../../Extra/LinkOnTop";

// post: post_id
// url: ../backend/postpubliccomments OR backend/postpubliccomments
const Comments = ({post,url}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(prevState => !prevState);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();

    useEffect( () => {
        getComments( setComments, `${url}/${post}`);
    }, [newComment]);

    return (<>
        <div className="text-muted" onClick={(event) => {
            if (event.target === event.currentTarget && comments.length>0) toggleExpand();
        }}>
                {
                    isExpanded ? (
                        comments ? (
                            comments.map( comment => 
                                <Row className="comment align-items-start">
                                    <Col xs={2}>
                                        <img src={`/files/${comment.user.image}`} width={60}/>
                                    </Col>
                                    <Col xs={10}>
                                        <Row>
                                            <Col xs={12} className="d-flex justify-content-between align-items-start">
                                                <Link to={`/user/${comment.user.slug}`} onClick={scrollTop}>
                                                    {comment.user.name}
                                                </Link>
                                                <span className="ml-auto">
                                                    {new Date(comment.date).toISOString().split('T')[1].split('.')[0]} {new Date(comment.date).toISOString().split('T')[0]} 
                                                </span>
                                            </Col>
                                            <Col xs={12} className="text-left">{comment.comment}</Col>
                                        </Row>
                                    </Col>
                                </Row>               
                            )
                        ): <p>No comments</p>
                        
                    ) : (
                        comments && comments.length > 0 ? (<>Comments: {comments.length}</>) : (<>No comments</>)
                    )
                }
            {comments.length > 0 && 
                <Button variant="outline" onClick={toggleExpand}>
                    {isExpanded ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
                </Button>
            }
        </div>
            <hr/>
            <NewComment post={post} onComment={setNewComment} url={url}/>
    </>);
}

export default Comments;