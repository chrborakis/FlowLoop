import React, { useEffect, useState } from "react";
import { getLikes, postLike} from "./LikesUtils";
import { useAuth } from "../../../store/AuthContext";
// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
// import { Provider, LikeButton } from "@lyket/react";
import BeenhereIcon from '@mui/icons-material/Beenhere';

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
        <Button onClick={handleLike} disabled={likes?.find((like) => like?.user.slug === user.slug)}>
            <BeenhereIcon/> {likes?.length || 0}
        </Button>         
    )
}

export default Likes;