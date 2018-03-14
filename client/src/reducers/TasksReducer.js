import _ from 'lodash';

import { GET_TASKS } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_TASKS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
