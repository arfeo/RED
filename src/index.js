import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import { constants } from './utils/constants';
import { getData } from './utils/storage';

import './index.css';

const initialStore = { ...constants.initialStore };
const storedSections = JSON.parse(getData('sections'));

if (storedSections) {
  initialStore.sections = storedSections;
}

const store = createStore(reducer, initialStore, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
