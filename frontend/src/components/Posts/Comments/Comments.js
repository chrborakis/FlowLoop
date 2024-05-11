import React, { useState, useEffect } from "react";
import {getComments} from "./CommentsUtils";
import NewComment from "./NewComment";
import {Card, Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import '../../../../static/css/Posts/Comment.css';
import '../../../../static/css/index.css';

import { scrollTop } from "../../Extra/LinkOnTop";
import CommentIcon from '@mui/icons-material/Comment';

// post: post_id
// url: ../backend/postpubliccomments OR backend/postpubliccomments
const Comments = ({post,url,comments,exp,setNewComment }) => { 
    return (<>
        <div className="text-muted list-scroll" onClick={(event) => {
            if (event.target === event.currentTarget && comments.length>0) exp.toggleExpand();
        }}>
            {
                exp.isExpanded && (
                    comments ? (
                        comments.map( comment => 
                            <Row style={{ width: '90%', margin: '5%' }} className="comment align-items-start">
                                <Col xs={2}>
                                    <img src={`/files/${comment.user.image}`} style={{ width: '60px', height: '60px', borderRadius:'50%' }} />
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
                                        <Col xs={12} className="text-left" style={{ textAlign: 'left' }}>{comment.comment}</Col>
                                    </Row>
                                </Col>
                            </Row>               
                        )
                    ): <p>No comments</p>  
                )
            }
            {comments.length > 0 && 
                <Button variant="outline" onClick={exp.toggleExpand}>
                    {exp.isExpanded ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
                </Button>
            }
        </div>
            <hr/>
            <NewComment post={post} onComment={setNewComment} url={url}/>
    </>);
}

export default Comments;