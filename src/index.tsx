import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Pages/App/App';


declare global {
    interface Window {
        dataLayer: any
        clipboardData: ClipboardEvent["clipboardData"]
        requestDomain: string
    }
}


ReactDOM.render(

    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
