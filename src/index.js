import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import ReactGA from 'react-ga';
React.GA.initialize(process.env.REACT_APP_GA);
ReactGA.pageview(window.location.pathname);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
