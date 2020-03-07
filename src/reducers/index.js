import { combineReducers } from 'redux';

import tasks from './taskReducer';
import arrTasks from './tasksReducer';

export default combineReducers({
  tasks,
  arrTasks
})