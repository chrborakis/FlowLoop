import React, {useState, useEffect} from "react";
import { getChats } from "./ChatUtils";
import { Row, Col, Card } from "react-bootstrap";
import { User } from "../Profiles/Profile";
import { scrollTop } from "../Extra/LinkOnTop";
import { Link } from "react-router-dom";
import { dateFormat } from "../Extra/Date";
import Chat from "./Chat";

import '../../../static/css/messages.css'

const Messages = ({ user, refresh, messages, chats, setChat, handleChat }) => {
    return (
        <div className="chats-list">
            {chats && chats.length > 0 ? (
                chats.map((chat, idx) => (
                    <div key={chat.message_id} onClick={() => handleChat(chat)}
                    className={`chat ${!chat.read && user === chat.receiver_info.id ? "unread" : ""}`}
                    >
                        <Col xs={10}>
                            <Row>
                                <Col xs={2}>
                                    <img src={ user === chat.sender_info.id ? `/files/${chat.receiver_info.image}` : `/files/${chat.sender_info.image}`} style={{width: "40px",height: "40px",borderRadius: "50%",}} />
                                </Col>
                                <Col xs={10} className="d-flex justify-content-between align-items-start">
                                    <Link to={ user === chat.sender_info.id  ? `/user/${chat.receiver_info.slug}`  : `/user/${chat.sender_info.slug}`} onClick={scrollTop}>
                                        {user === chat.sender_info.id ? chat.receiver_info.name : chat.sender_info.name}
                                    </Link>
                                    <span className="ml-auto">
                                        {dateFormat(chat.send_date)}
                                    </span>
                                </Col>
                                <Col className="chat-text" xs={12}>
                                    {user === chat.sender_info.id && <b>You: </b>}
                                    {chat.message}
                                </Col>
                            </Row>
                        </Col>
                        {idx !== chats.length - 1 && <hr />}
                    </div>
                ))
            ) : (
                <p>No Chats found!</p>
            )}
        </div>
    );
};

// const Messages = ({user,refresh,messages}) => {
//     const [chats, setChats] = useState([])
//     const [chat, setChat] = useState()
    
//     useEffect(()=>{
//         if(refresh) {
//             setChats([]);
//             getChats( user, setChats)
//             messages.updateUnread(user, messages.setMessages)
//         }
//     },[refresh])

//     const handleChat = (_chat) => {
//         if(user === _chat.sender_info.id){
//             setChat({
//                 sender:  {
//                     'id':_chat.sender,  
//                     'user_id': _chat.sender_info.id,   
//                     'name':_chat.sender_info.name, 
//                     'slug':_chat.sender_info.slug, 
//                     'image':_chat.sender_info.image
//                 }, 
//                 receiver:{
//                     'id':_chat.receiver, 
//                     'user_id': _chat.receiver_info.id, 
//                     'name':_chat.receiver_info.name, 
//                     'slug':_chat.receiver_info.slug, 
//                     'image':_chat.receiver_info.image
//                 }
//             })
//         }else{
//             setChat({
//                 sender:  {
//                     'id':_chat.receiver, 
//                     'user_id': _chat.receiver_info.id, 
//                     'name':_chat.receiver_info.name, 
//                     'slug':_chat.receiver_info.slug, 
//                     'image':_chat.receiver_info.image
//                 }, 
//                 receiver:{
//                     'id':_chat.sender,  
//                     'user_id': _chat.sender_info.id,   
//                     'name':_chat.sender_info.name, 
//                     'slug':_chat.sender_info.slug, 
//                     'image':_chat.sender_info.image
//                 }
//             })
//         }
//     }

//     return(<>
//         <div className="chats-list">
//             { chats && chats.length > 0 ?(
//                 chats.length > 0 && chats.map( (chat, idx) => <>         
//                     <div key={chat.message_id} className={`chat ${!chat.read && user === chat.receiver_info.id ? 'unread' : ''}`} onClick={() => handleChat(chat)}>
//                         <Col xs={10}>
//                             <Row>
//                                 <Col xs={2}>
//                                     <img src={user === chat.sender_info.id ? `/files/${chat.receiver_info.image}` : `/files/${chat.sender_info.image}`} style={{ width: '40px', height: '40px', borderRadius:'50%' }} />
//                                 </Col>
//                                 <Col xs={10} className="d-flex justify-content-between align-items-start">
//                                     <Link to={user === chat.sender_info.id ? `/user/${chat.receiver_info.slug}` : `/user/${chat.sender_info.slug}`} onClick={scrollTop}>
//                                         {user === chat.sender_info.id ? chat.receiver_info.name : chat.sender_info.name}
//                                     </Link>
//                                     <span className="ml-auto">{dateFormat(chat.send_date)}</span>
//                                 </Col>
//                                 <Col className='chat-text' xs={12}>
//                                     {user === chat.sender_info.id && <b>You: </b>}
//                                     {chat.message}
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </div>
//                     {idx !== chats.length - 1 && <hr />}
//                 </>)
//             ): (
//                 <p>No Chats found!</p>
//             )}
//         </div>
//         { chat?.receiver?.id && chat?.sender?.id ? <Chat chat={chat} setChat={setChat}/> : (
//             () => {setChat(false)}
//         ) }
//     </>)
// }

export default Messages;