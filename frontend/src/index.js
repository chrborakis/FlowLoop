import ReactDOM from 'react-dom/client';

import { AuthProvider } from './store/AuthContext';
import { NotificationProvider } from './store/NotificationContext';
import { ChatProvider } from './store/ChatContext';
import { RequestProvider } from './store/RequestContext';
import App from './components/App';
import React from 'react';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <AuthProvider>
        <NotificationProvider>
            <RequestProvider>
                <ChatProvider>
                    <App />
                </ChatProvider>
            </RequestProvider>
        </NotificationProvider>
    </AuthProvider>
);

