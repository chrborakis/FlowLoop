import React, { useState, useEffect} from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import '../../../static/css/alertMessage.css'

const AlertMessage = ({alert}) => {
    console.log(alert)
    const {state, info, text} = alert;
    const [showAlert, setShowAlert] = useState(state);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return(<>
        {showAlert && (
            <Alert className="alertMessage" icon={<CheckIcon fontSize="inherit" />} severity={info}>
                {text}
            </Alert>
        )}
    </>)
}

export default AlertMessage;