/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'; // eslint-disable-line import/no-extraneous-dependencies

import promise from 'redux-promise';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';

const composeEnhancers = composeWithDevTools({
  /* options like actionSanitizer, stateSanitizer */
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(promise)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'), // eslint-disable-line no-undef
);
registerServiceWorker();
