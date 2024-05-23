import Button from 'react-bootstrap/Button';
import React, {useState, useEffect} from 'react';

import { send_request } from './UserUtils';

const FriendButton = ({ user, profile, setRequested, requested, onReply}) => {
    // const [client, setClient] = useState(null);
    const [buttonConfig, setButtonConfig] = useState({ text: 'Send request', variant: 'success' });
    
    const [showButtons, setShowButtons] = useState(false);
    const handleClick = () => setShowButtons(true);    

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
        console.log("REQUESTED -> ", requested)
      }, [requested]);

    return(
        <>
            {requested == 'reply' ? (
                <>
                    {!showButtons && <Button onClick={handleClick}>Reply Request</Button>}
                    {showButtons && (
                      <>
                        <Button onClick={() => onReply('A')} variant="outline-primary">Accept</Button>
                        <Button onClick={() => onReply('D')} variant="outline-danger">Decline</Button>
                      </>
                    )}
                </>
            ) : (
                <Button variant={buttonConfig.variant} disabled={requested=='P'} onClick={sendRequest}>
                    { buttonConfig.text }
                </Button>
            )}
        </>
        
    )
}


export default FriendButton;

