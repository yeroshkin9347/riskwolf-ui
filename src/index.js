import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Styles
import 'reset-css';

// MS Azure Login
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Vendor/Azure/authConfig";
// MS Azure Login ./end

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>,
  document.getElementById('root')
);
