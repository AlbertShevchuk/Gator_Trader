import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize('UA-131088262-1');
    ReactGA.pageview('/home');
}

ReactDOM.render(<Router history={browserHistory} routes={routes} />,
   document.getElementById('app'));
registerServiceWorker();
