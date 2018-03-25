import _ from 'lodash';

import { DELETE_TASK, GET_TASK, GET_TASKS } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_TASK:
      return _.omit(state, action.payload.data);
    case GET_TASK: {
      const task = action.payload.data;
      // If state is empty we only add the loaded task
      return { [task.id]: task };
    }
    case GET_TASKS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
