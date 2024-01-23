import React, { useState, useEffect } from "react";
import GetComments from "./GetComments";
import NewComment from "./NewComment";

const Comments = ({post,url}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();

    useEffect( () => {
        GetComments({ onFetch: setComments, url: url+post});
    }, [newComment]);

    return (
        <div>
            {comments ? (
                comments.map( comment => 
                    <div key={comment.id}>
                        <div className="uploader">
                            <image src={comment.user.image}/>
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