import _ from 'lodash';

import { DELETE_TASK, GET_TASKS } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_TASK:
      console.log(action.payload.data);

      return _.omit(state, action.payload.data);
    case GET_TASKS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
