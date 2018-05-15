import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Router, Route } from 'react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createHistory } from 'history';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './containers/App';
import Auth from './components/Login/Auth';
import Login from './components/Login/Login';

import reducer from './reducers';
import { constants } from './utils/constants';
import { getData } from './utils/storage';
import setTheme from './sagas/theme';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const sagaMiddleware = createSagaMiddleware();
const initialStore = { ...constants.initialStore };
const storedSections = JSON.parse(getData('sections'));

if (storedSections) {
  initialStore.sections = storedSections;
}

const middleware = routerMiddleware(createHistory());

const store = createStore(
  reducer,
  initialStore,
  composeWithDevTools(applyMiddleware(thunk, middleware, sagaMiddleware))
);

const history = syncHistoryWithStore(createHistory(), store);

sagaMiddleware.run(setTheme);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Auth}>
        <Route path="/desktop" component={App} />
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
