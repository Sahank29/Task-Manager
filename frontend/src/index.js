import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="349859429335-ep3jeo2s850ja955ff6q479tvub7bnrd.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>

);
