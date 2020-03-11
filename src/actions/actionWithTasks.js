import axios from 'axios';
import { reloadToken } from './actionAuth';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] =  'JWT ' + token;

export function getData(token) {
  reloadToken();
  return {
    type: 'GET_DATA',
    payload: 
      axios.get('https://trello.backend.tests.nekidaem.ru/api/v1/cards/')
      .then(res => {
        const tasks = res.data;
        const data = {
          tasks,
          OnHold: tasks.filter(task => task.row === '0'),
          InProgress: tasks.filter(task => task.row === '1'),
          NeedsReview: tasks.filter(task => task.row === '2'),
          Approved: tasks.filter(task => task.row === '3')
        }
        return data;
      })
  }
}

export function addTasks(body, type) {
  return {
    type,
    payload: 
      axios.post('https://trello.backend.tests.nekidaem.ru/api/v1/cards/', body)
      .then(res => res.data)
  }
}

export function deleteTask(id) {
  return {
    type: 'DELETE_TASK',
    payload:
      axios.delete(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`)
      .then(() => id)
  }
}

export function moveTaskInColumn(tasks, type) {
  return {
    type: `MOVED_TASK_${type.toUpperCase()}`,
    payload: tasks
  }
}

export function updateTask(body, id) {
  return {
    type: 'UPDATE_TASK',
    payload: 
      axios.patch(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`, body)
      .then(res => res.data)
  }
}