import axios from 'axios';

export const GET_TASKS = 'get_tasks';

const ROOT_URL = 'http://localhost:9090/api/v1';

export function loadTasks() {
  const request = axios.get(`${ROOT_URL}/tasks`);

  return {
    type: GET_TASKS,
    payload: request,
  };
}
