import React, {useState} from "react";
import { TextField } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Card, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../../store/AuthContext";

const NewMessage = ({chat, setMessages, socket, onSend}) => {
    const { user } = useAuth();   

    const [message, setMessage] = useState('')
    const handleChange = (event) => setMessage(event.target.value);

    const handleSubmit = ( e) => {
        e.preventDefault();
        onSend( {...chat, ...{message}}, setMessages, setMessage, socket, user?.token)
    }

    return(<>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                    <TextField className="textfield" placeholder="Send a message" name="message"
                        value={message} onChange={handleChange} multiline fullWidth  
                        onKeyDown={(event) => {if (event.key === 'Enter') {event.preventDefault(); handleSubmit(event); }}}
                    />
                </Col>
                <Col xs={2} className="d-flex align-items-center justify-content-end">
                    <Button variant="contained" className="btn-primary" type="submit" endIcon={<SendIcon />}/>
                </Col>
            </Row>
        </Form>
    </>)
}

export default NewMessage;