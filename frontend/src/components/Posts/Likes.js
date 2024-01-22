import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import GetLikes from "./GetLikes";

const Likes = ({post, url}) => {
    const [likes, setLikes] = useState();

    useEffect( () => {
        GetLikes({ onFetch: setLikes, url});
    }, [url]);

    return(
        <div>
            { likes && <>
                <p>Likes: {likes.length}</p>
            </>
            }
        </div>
    )
}

export default Likes;