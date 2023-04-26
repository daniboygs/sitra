import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
//import App from './App';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-notifications/lib/notifications.css';
import 'react-notifications/dist/react-notifications.css';
import 'react-notifications-component/dist/theme.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.js';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";

import {
    LightTheme,
    BaseProvider,
    styled,
    DarkTheme,
    createDarkTheme,
  } from "baseui";

  const Centered = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  });
  
//ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(

    <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <Centered>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Centered>
        </AuthProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
