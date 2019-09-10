// @flow
import { combineReducers } from 'redux';
import tasks from './tasks';
import workflows from './workflows';

export default combineReducers({
  tasks,
  workflows,
});
