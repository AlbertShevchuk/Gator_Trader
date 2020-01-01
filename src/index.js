import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import { Router, browserHistory } from 'react-router';
import routes from './routes';



ReactDOM.render(<Router history={browserHistory} routes={routes} />,
   document.getElementById('app'));
registerServiceWorker();
