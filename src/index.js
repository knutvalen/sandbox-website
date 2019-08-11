import React from 'react';
import ReactDOM from 'react-dom';
import App from './controllers/app';
import registerServiceWorker from './controllers/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
