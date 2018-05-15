import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import home from './home';
import sections from './sections';
import windows from './windows';
import tabs from './tabs';
import context from './context';
import theme from './theme';

export default combineReducers({
  routing: routerReducer,
  context,
  auth,
  home,
  theme,
  sections,
  windows,
  tabs,
});
