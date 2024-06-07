import React, {useState,useEffect} from "react"
import { getNotifications } from "./NotificationsUtils";
import { Row, Col } from "react-bootstrap";
import { scrollTop } from "../Extra/LinkOnTop";
import { Link } from "react-router-dom";
import { dateFormat } from "../Extra/Date";
import "../../../static/css/messages.css";
import { UserAvt } from "../Profiles/Profile";

const Notifications = ({user,notifications}) => {
    const [notif, setNotif] = useState([]);

    useEffect(() => {
        setNotif([]);
        getNotifications( user?.id, setNotif);
        notifications.updateUnreadNotifications(user.id, notifications.setNotifications);
    }, [user]);

    return(<>
        <div className="chats-list">
            {notif && notif.length > 0 ? (
                notif.map((notification, idx) => (
                    <div key={notification.id}className={`chat ${!notification.is_read ? "unread" : ""}`} onClick={ () => notifications.readNotification(notification.id)}>
                        <Col xs={10}>
                            <Row>
                                <Col xs={2}><UserAvt user={notification.sender_info} width={40} circle/></Col>
                                <Col xs={10} className="d-flex justify-content-between align-items-start">
                                    {notification.sender_info.name}
                                    <span className="ml-auto">{dateFormat(notification.timestamp)}</span>
                                </Col>
                                <Col className="chat-text" xs={12}>
                                    <Link to={notification.url} onClick={scrollTop}>
                                        {notification.message}
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        {idx !== notif.length - 1 && <hr />}
                    </div>
                ))
            ) : (
                <p>No Notifications found!</p>
            )}
        </div>
    </>)
} 

export default Notifications