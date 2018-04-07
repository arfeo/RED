import { combineReducers } from 'redux';

import home from './home';
import sections from './sections';
import windows from './windows';
import tabs from './tabs';

export default combineReducers({
  home,
  sections,
  windows,
  tabs,
});
