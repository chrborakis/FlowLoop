import Button from 'react-bootstrap/Button';
import React, {useState, useEffect} from 'react';

import { send_request } from './UserUtils';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const FriendButton = ({ user, profile, setRequested, requested}) => {
    const [client, setClient] = useState(null);
    const [buttonConfig, setButtonConfig] = useState({ text: 'Send request', variant: 'success' });
    
    // useEffect(() => {
    //     setClient(new W3CWebSocket('ws://127.0.0.1:8000/ws/'))
    // },[])

    // useEffect(()=>{
    //     if(client){
    //         console.log('SOcket: ', client)
    //         client.onopen = () => console.log('WebSocket Client Connected');
    //         client.onclose = () => console.log('WebSocket Client Disconnected');
    //         client.onerror = (error) => console.error('Connection Error: ', error);
    //         // client.onmessage = (message) => console.log('Received message:', message.data);
    //         // client.send('Hello, WebSocket server!');
    //     }
    // },[client]) 
    

    const sendRequest = () => {
        if( buttonConfig.text === 'Delete Friend'){
            // socket.emit('friend-deletion', { user, profile });
            send_request( user, profile, setRequested, 'D')
        }else if( buttonConfig.text === 'Send request'){
            // socket.emit('friend-request', { user, profile });
            send_request( user, profile, setRequested, 'P')
        }
    };

    useEffect(() => {
        if (requested === 'P') {
            setButtonConfig({ text: 'Already requested!', variant: 'secondary' });
        } else if (requested === 'A') {
            setButtonConfig({ text: 'Delete Friend', variant: 'danger' });
        } else {
            setButtonConfig({ text: 'Send request', variant: 'success' });
        }
      }, [requested]);

    return(
        <Button variant={buttonConfig.variant} disabled={requested=='P'} onClick={sendRequest}>
        { buttonConfig.text }
        </Button>
    )
}


export default FriendButton;