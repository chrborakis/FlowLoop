import React, {useState,useEffect} from "react"
import { getNotifications } from "./NotificationsUtils";
import { Row, Col } from "react-bootstrap";
import { scrollTop } from "../../Extra/LinkOnTop";
import { Link } from "react-router-dom";
import { dateFormat } from "../../Extra/Date";
import { UserAvt } from "../../Profiles/Profile";
import { readNotification } from "./NotificationsUtils";
import "../../../../static/css/messages.css";

const Notifications = ({user, refresh, notifications}) => {
    const [notif, setNotif] = useState([]);

    useEffect(() => {
        if(refresh){
            setNotif([]);
            getNotifications( user?.id, setNotif);
            notifications.updateUnreadNotifications(user.id, notifications.setNotifications);
        }
    }, [refresh,user]);

    return(<>
        <div className="chats-list">
            {notif && notif.length > 0 ? (
                notif.map((notification, idx) => (
                    <>
                    <div key={notification.id}className={`chat ${!notification.is_read ? "unread" : ""}`} onClick={ () => readNotification(notification.id, user?.token)}>
                        <Link to={notification.url} onClick={scrollTop}>
                            <Col xs={10}>
                                <Row>
                                    <Col xs={2}><UserAvt user={notification.sender_info} width={40} circle/></Col>
                                    <Col xs={10} className="d-flex justify-content-between align-items-start">
                                        {notification.sender_info.name}
                                        <span className="ml-auto">{dateFormat(notification.timestamp)}</span>
                                    </Col>
                                    <Col className="chat-text" xs={12}>
                                            {notification.message}
                                    </Col>
                                </Row>
                            </Col>
                        </Link>
                    </div>
                    {idx !== notif.length - 1 && <hr />}
                    </>
                ))
            ) : (
                <p>No Notifications found!</p>
            )}
        </div>
    </>)
} 

export default Notifications