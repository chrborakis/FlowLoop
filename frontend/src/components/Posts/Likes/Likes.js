import React, { useEffect, useState } from "react";
import { getLikes, postLike} from "./LikesUtils";
import { useAuth } from "../../../store/AuthContext";
import Button from 'react-bootstrap/Button';
import { Provider, LikeButton } from "@lyket/react";

const Likes = ({post, url}) => {
    const { user } = useAuth();

    const [likes, setLikes] = useState();
    const [liked, setLiked] = useState(true);

    useEffect( () => {
        getLikes( setLikes, url);
    }, [url, liked]);

    const handleLike = () => {
        //like id: Foreign key depends Public Or Private
        // const like = url.includes('public') ? user.id : user.work_id
        postLike( url, post, url.includes('public') ? user.id : user.work_id, setLiked)
        console.log("Liked: ", liked)
    };
    
    return(
        <div>
            { likes && <>
                <p>Likes: {likes.length}</p>
                {/* Find if liked by current user */}
                { likes.find(like => like.user.slug === user.slug) ? (
                    <p>Liked</p>
                ) : (<></>
                )}
            </>
            }
            {(likes === undefined || likes.length === 0 || !likes.find((like) => like.user.slug === user.slug)) && (
                <Button onClick={handleLike}>Like</Button>
            )}         
            
        {/* <Provider apiKey="acc0dbccce8e557db5ebbe6d605aaa">
        <LikeButton namespace="my-blog-post" 
            id="how-to-beat-me-at-chess" onPress={openSubscribeModal}
        />
        </Provider> */}
        </div>
    )
}

export default Likes;