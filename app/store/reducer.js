import {combineReducers} from 'redux';

import session from './session';
import watch from './watch';
import athletes from './athletes';
import events from './events';

export default combineReducers({
  session,
  watch,
  athletes,
  events,
});
