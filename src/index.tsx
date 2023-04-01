import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Pages/App/App';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import './firebase.js';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingComponent from './Components/LoadingComponent';
// import * as firebase from 'firebase/app'

// firebase.initializeApp();

declare global {
    interface Window {
        dataLayer: any
        clipboardData: ClipboardEvent["clipboardData"]
        requestDomain: string
    }
}


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={<LoadingComponent/>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
