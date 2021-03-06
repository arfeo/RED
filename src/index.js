import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Router, Route } from 'react-router';
import thunk from 'redux-thunk';
import { createHistory } from 'history';

import 'bootstrap/dist/css/bootstrap.min.css';

import Auth from './components/Auth/Auth';

import reducer from './reducers';
import { INITIAL_STORE } from './utils/constants';
import { getData } from './utils/storage';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const initialStore = { ...INITIAL_STORE };
const storedSections = JSON.parse(getData('sections'));

if (storedSections) {
  initialStore.sections = storedSections;
}

const middleware = routerMiddleware(createHistory());

const store = createStore(
  reducer,
  initialStore,
  composeWithDevTools(applyMiddleware(thunk, middleware))
);

const history = syncHistoryWithStore(createHistory(), store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Auth} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
