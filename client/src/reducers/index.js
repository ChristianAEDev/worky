import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TasksReducer from './TasksReducer';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  // The name "form" has to be used. Otherwise redux-form will not work.
  form: formReducer,
});

export default rootReducer;
