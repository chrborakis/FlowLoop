import React, { createContext, useRef, useContext, useState, useEffect, useCallback} from "react";
import { useAuth } from './AuthContext';

export const RequestContext = createContext();

const RequestProvider = ({ children }) => {
    const { user } = useAuth(); 
    const [socket, setSocket] = useState(null);
    const [requests, setRequests] = useState(0);
    const socketRef = useRef(null);

    useEffect(()=>{
        if (user?.id && !socketRef.current) {
            setSocket(new WebSocket(`ws://${window.location.host}/ws/requests/${user?.id}/`))
        }
    },[user?.id])
    
    useEffect(()=>{
        if(socket){
            socket.onopen = () => console.log('WebSocket connection established: ', socket);
            socket.onmessage = (e) => {
                let data = JSON.parse(e.data);
                if (data.type === 'requests') setRequests((prevCount) => prevCount + 1);
            };
            socket.onclose = () => console.log('WebSocket connection closed: ', socket);
            
            return () => socket.close()
        }
    },[socket])
    
    return (<RequestContext.Provider value={{ requests, setRequests, socket}}>
        {children}
    </RequestContext.Provider>);
};

const useRequest = () => {
    const context = useContext(RequestContext);
    if(!context){
        throw new Error('useRequest must be used within an RequestProvider')
    }
    return context;
}

export { RequestProvider, useRequest }