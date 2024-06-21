import React, { createContext, useRef, useContext, useState, useEffect, useCallback} from "react";
import { useAuth } from './AuthContext';
import { getUnreadNotifications } from '../components/AppBar/Notifications/NotificationsUtils';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const { user } = useAuth(); 
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState(0);
    const socketRef = useRef(null);

    useEffect(()=>{
        if (user?.id && !socketRef.current) {
            setSocket(new WebSocket(`ws://${window.location.host}/ws/chat_unread/${user?.id}/`))
        }
    },[user?.id])
    
    useEffect(()=>{
        if(socket){
            socket.onopen = () => console.log('WebSocket connection established: ', socket);
            socket.onmessage = (e) => {
                let data = JSON.parse(e.data);
                if (data.type === 'chat_notification') setMessages((prevCount) => prevCount + 1);
            };
            socket.onclose = () => console.log('WebSocket connection closed: ', socket);
            
            return () => socket.close()
        }
    },[socket])
    
    return (<ChatContext.Provider value={{ messages, setMessages, socket}}>
        {children}
    </ChatContext.Provider>);
};

const useChat = () => {
    const context = useContext(ChatContext);
    if(!context){
        throw new Error('useChat must be used within an ChatProvider')
    }
    return context;
}

export { ChatProvider, useChat }