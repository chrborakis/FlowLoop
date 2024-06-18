import React, { useEffect, useState }  from "react";
import { getComments } from "./Comments/CommentsUtils";
import Likes from "./Likes/Likes";
import { Row, Col } from "react-bootstrap";
import Comments from "./Comments/Comments";
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';

const PostActions = ({url,post}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(prevState => !prevState);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();

    useEffect( () => {
        getComments( setComments, `${url}comments/${post.post_id}`);
    }, [newComment, isExpanded]);

    return(
        <div className="comments">
            <Row>
                <Col>
                    <Likes post={post} url={`${url}likes/${post.post_id}`}/>
                </Col>
                <Col>
                    {<Button> <CommentIcon/> {comments?.length || 0}</Button>}
                </Col>
            </Row>
                { comments ? (
                    <Comments post={post} url={`${url}comments`} comments={comments} exp={{isExpanded,toggleExpand}} setNewComment={setNewComment}/>
                ) : (
                    <p>No comments</p> 
                )}
        </div>
    )
}

export default PostActions;