import React, { useState, useEffect } from "react";
import {getComments} from "./CommentsUtils";
import NewComment from "./NewComment";

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
                    <div key={comment.id}>
                        <div className="uploader">
                            <img src={comment.user.image}/>
                            <h4>{comment.user.name}</h4>
                        </div>
                        <div className="content">
                            <p>{comment.comment}</p>
                        </div>
                    </div> 
                )
            ): <div>
                <p>No comments yet!</p>
            </div>
            }
            <NewComment post={post} onComment={setNewComment} url={url}/>
        </div>
    );
}

export default Comments;