import React,{useState, useEffect} from "react";
import { getFriends } from "./Utils";

const FriendList = ({user_id}) => {
    const [friends, setFriends] = useState([])

    useEffect(()=>{
        getFriends(user_id, setFriends)
    },[])

    return(<>
    
    </>)
}

export default FriendList;