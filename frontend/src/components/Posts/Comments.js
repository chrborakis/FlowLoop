import React, { useState, useEffect } from "react";
import GetComments from "./GetComments";

const Comments = ({post, url}) => {
    const [comments, setComments] = useState();

    useEffect( () => {
        GetComments({ onFetch: setComments, url});
    }, [url]);

    return (
        <div>
            {comments ? (
                comments.map( comment => 
                    // {console.log(comment)}
                    <div>
                        <div key={comment.id}>
                            <div className="uploader">
                                <image src={comment.user.image}/>
                                <h4>{comment.user.name}</h4>
                            </div>
                            <div className="content">
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                        <div>
                            <p>Add Comment:</p>
                        </div>
                    </div>
                )
            ): <div>
                <p>Add Comment:</p>
            </div>
            }
        </div>
    );
}

export default Comments;