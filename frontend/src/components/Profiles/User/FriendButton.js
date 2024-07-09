import Button from '@mui/material/Button';

import React, {useState, useEffect} from 'react';

import { send_request, getEducation } from './UserUtils';

const FriendButton = ({ user, profile, setRequested, requested, onReply, token}) => {
    // const [client, setClient] = useState(null);
    const [buttonConfig, setButtonConfig] = useState({ text: 'Send request', variant: 'success' });
    
    const [showButtons, setShowButtons] = useState(false);
    const handleClick = () => setShowButtons(true);    

    const sendRequest = () => {
        if( buttonConfig.text === 'Delete Friend'){
            send_request( user?.id, profile, setRequested, 'D', token)
        }else if( buttonConfig.text === 'Send request'){
            send_request( user?.id, profile, setRequested, 'P', token)
        }
        get_request( user?.id, profile, setRequested);
    };

    useEffect(() => {
        if (requested === 'P') {
            setButtonConfig({ text: 'Already requested!', variant: 'secondary' });
        } else if (requested === 'A') {
            setButtonConfig({ text: 'Delete Friend', variant:"outlined", color:"error"});
        } else {
            setButtonConfig({ text: 'Send request', variant: 'success' });
        }
      }, [requested]);

    return(
        <>
            {requested == 'reply' ? (
                <>
                    {!showButtons && <Button onClick={handleClick}>Reply Request</Button>}
                    {showButtons && (
                      <>
                        <Button onClick={() => onReply('A')} variant="contained" color="success">Accept</Button>
                        <Button onClick={() => onReply('D')} variant="outlined"  color="error">Decline</Button>
                      </>
                    )}
                </>
            ) : (
                <Button variant={buttonConfig.variant} color={buttonConfig?.color} disabled={requested=='P'} onClick={sendRequest}>
                    { buttonConfig.text }
                </Button>
            )}
        </>
        
    )
}


export default FriendButton;

