import axios from 'axios';

export const DELETE_TASK = 'delete_task';
export const GET_TASKS = 'get_tasks';

const ROOT_URL = 'http://localhost:9090/api/v1';

export function deleteTask(taskID) {
  const request = axios.delete(`${ROOT_URL}/tasks/${taskID}`);
  return {
    type: DELETE_TASK,
    payload: request,
  };
}

export function loadTasks() {
  const request = axios.get(`${ROOT_URL}/tasks`);

  return {
    type: GET_TASKS,
    payload: request,
  };
}
