import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TasksReducer from './TasksReducer';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  task: formReducer,
});

export default rootReducer;
