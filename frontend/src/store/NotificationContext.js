import React, { createContext, useContext, useState, useEffect, useCallback} from "react";
import { useAuth } from './AuthContext';
import { getUnreadNotifications } from '../components/AppBar/Notifications/NotificationsUtils';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const { user } = useAuth(); 
    const [notifications, setNotifications] = useState(0);

    const updateNotifications = useCallback(() => {
        if (user) {
            getUnreadNotifications(user.id, setNotifications);
        }
    }, [user]);

    useEffect(() => {
        updateNotifications();
    }, []);

    const addNotification = useCallback(() => {
        setNotifications(prevCounter => prevCounter + 1);
        console.log("ADDED NOTIFICATION", notifications);
    }, [notifications]);

    const delNotification = useCallback(() => {
        setNotifications(prevCounter => prevCounter - 1);
    }, []);
    
    
    return (<NotificationContext.Provider value={{ notifications, setNotifications, addNotification, delNotification, updateNotifications}}>
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