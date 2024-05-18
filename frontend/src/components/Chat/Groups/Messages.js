import React, {useState,useRef,useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import { dateFormat } from "../../Extra/Date";

const Messages = ({messages, user_id}) => {
    const messageEndRef = useRef(null);
    
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const handleMouseEnter = (messageId) => setHoveredMessageId(messageId);
    const handleMouseLeave = () => setHoveredMessageId(null);

    const scrollToBottom = () => messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    useEffect(() => scrollToBottom(), [messages]);
    
    return(<>
        {messages ? messages.sort((a, b) => new Date(a.send_date) - new Date(b.send_date)).map((message, index) => {
            const isDifferentSender = index === 0 || messages[index - 1].sender_info.id !== message.sender_info.id;
            
            return (
                <React.Fragment key={message.id}>
                    {
                        isDifferentSender && message?.sender_info?.id !== user_id && (<Row>
                            { message?.sender_info?.id && (
                                <Col xs={1} className="d-flex justify-content-between align-items-start">
                                    <img src={`/files/${message?.sender_info?.image}`} alt={message?.sender_info?.name} style={{width: '35px',height: '35px',borderRadius: '50%'}}/>
                                </Col>
                            )}
                            <Col xs={11} className="text-left" style={{ textAlign: 'left' }}>
                                <span>{message?.sender_info?.name}</span>
                            </Col>
                        </Row>)
                    }
                    <div className={`message ${message?.sender_info?.id === user_id ? 'sender' : 'receiver'}`} onMouseEnter={() => handleMouseEnter(message.id)}onMouseLeave={handleMouseLeave}>
                        {message.message}
                    </div>
                    {hoveredMessageId === message.id && (
                        <span className={`message-date ${message?.sender_info?.id === user_id ? 'sender-date' : 'receiver-date'}`}>
                            {dateFormat(message.send_date)}
                        </span>
                    )}
                </React.Fragment>
              );
        }) : (<p>Start conversation</p>)
        }
        <div className="message-ref" ref={messageEndRef} />
    </>) 
}

export default Messages;