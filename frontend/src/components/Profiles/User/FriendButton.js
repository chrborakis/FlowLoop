import Button from 'react-bootstrap/Button';
import React, {useState, useEffect} from 'react';

import { send_request } from './UserUtils';

const FriendButton = ({ user, profile, setRequested, requested}) => {
    const [buttonConfig, setButtonConfig] = useState({ text: 'Send request', variant: 'success' });

    const sendRequest = () => {
        if( buttonConfig.text === 'Delete Friend'){
            send_request( user, profile, setRequested, 'D')
        }else if( buttonConfig.text === 'Send request'){
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
        {
            buttonConfig.text
            // requested === 'P' ? 'Already requested!' : 
            //     requested === 'A' ? 'Delete Friend' : 'Send request'
        }
        </Button>
    )
}

export default FriendButton;