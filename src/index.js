import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

// eto na si jok
//ETO NA SI JERIS GALING AKO SA MAIN

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

