import React, { useEffect, useState } from "react";
import GetLikes from "./GetLikes";
import PostLike from "./PostLike";
import { useAuth } from "../../../store/AuthContext";

const Likes = ({post, url}) => {
    const { user } = useAuth();

    const [likes, setLikes] = useState();
    const [liked, setLiked] = useState(false);

    useEffect( () => {
        GetLikes({ onFetch: setLikes, url});
    }, [url, liked]);

    const handleLike = () => {
        PostLike({ url: url, post_id: post, like_id: url.includes('public') ? user.id : user.work_id, post: post})
        setLiked((prevValue) => !prevValue)
        console.log("Liked: ", liked)
    };
    
    return(
        <div>
            { likes && <>
                <p>Likes: {likes.length}</p>
                { likes.find(like => like.user.slug === user.slug) ? (
                    <p>
                        Liked
                    </p>
                ) : (
                    <button onClick={handleLike}>Like</button>
                )}
            </>
            }
            
            
        </div>
    )
}

export default Likes;