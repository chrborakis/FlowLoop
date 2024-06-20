import React, { createContext, useRef, useContext, useState, useEffect, useCallback} from "react";
import { useAuth } from './AuthContext';
import { getUnreadNotifications } from '../components/AppBar/Notifications/NotificationsUtils';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const { user } = useAuth(); 
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState(0);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const socketRef = useRef(null);

    useEffect(()=>{
        if (user?.id && !socketRef.current) {
            setSocket(new WebSocket(`ws://${window.location.host}/ws/notifications/${user?.id}/`))
        }
    },[user?.id])
    
    useEffect(()=>{
        if(socket){
            socket.onopen = () => console.log('WebSocket connection established: ', socket);
            socket.onmessage = (e) => {
                let data = JSON.parse(e.data);
                if (data.type === 'notification') setNotifications((prevCount) => prevCount + 1);
            };
            socket.onclose = () => console.log('WebSocket connection closed: ', socket);
            
            return () => socket.close()
        }
    },[socket])


    const updateNotifications = useCallback(() => {
        if (user) {
            getUnreadNotifications(user.id, setNotifications);
        }
    }, [user]);

    useEffect(() => {
        updateNotifications();
    }, []);

    const addNotification = useCallback(() => {
        setUpdateTrigger(prev => !prev);
        setNotifications(prevCounter => prevCounter + 1);
    }, [notifications]);

    const delNotification = useCallback(() => {
        setUpdateTrigger(prev => !prev);
        setNotifications(prevCounter => prevCounter - 1);
    }, []);
    
    
    return (<NotificationContext.Provider value={{ notifications, setNotifications, addNotification, delNotification, updateNotifications, socket}}>
        {children}
    </NotificationContext.Provider>);
};

const useNotification = () => {
    const context = useContext(NotificationContext);
    if(!context){
        throw new Error('useNotification must be used within an NotificationProvider')
    }
    return context;
}

export { NotificationProvider, useNotification }