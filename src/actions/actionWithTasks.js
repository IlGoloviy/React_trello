import axios from 'axios';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] =  'JWT ' + token;

export function setToken() {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.post('https://trello.backend.tests.nekidaem.ru/api/v1/users/login/', {
    "username": "illia",
	  "password": "12qwasaszx"
  }).then(res => {
    const { token } = res.data;
    localStorage.setItem('token', token);
  })
}

export function getData() {
  setToken();
  return {
    type: 'GET_DATA',
    payload: 
      axios.get('https://trello.backend.tests.nekidaem.ru/api/v1/cards/')
      .then(res => {
        const tasks = res.data;
        const data = {
          tasks,
          OnHold: [],
          InProgress: [],
          NeedsReview: [],
          Approved: []
        }
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].row === '0') {
            data.OnHold.push(tasks[i])
          }
          if (tasks[i].row === '1') {
            data.InProgress.push(tasks[i])
          }
          if (tasks[i].row === '2') {
            data.NeedsReview.push(tasks[i])
          }
          if (tasks[i].row === '3') {
            data.Approved.push(tasks[i])
          }
        }

        return data;
      })
  }
}

export function addTaskOnHold(body) {
  return {
    type: 'ADD_TASK_ON-HOLD',
    payload: 
      axios.post('https://trello.backend.tests.nekidaem.ru/api/v1/cards/', body)
      .then(res => res.data)
  }
}

export function addTaskInProgress(body) {
  return {
    type: 'ADD_TASK_IN-PROGRESS',
    payload: 
      axios.post('https://trello.backend.tests.nekidaem.ru/api/v1/cards/', body)
      .then(res => res.data)
  }
}

export function addTaskNeedsReview(body) {
  return {
    type: 'ADD_TASK_NEEDS-REVIEW',
    payload: 
      axios.post('https://trello.backend.tests.nekidaem.ru/api/v1/cards/', body)
      .then(res => res.data)
  }
}

export function addTaskApproved(body) {
  return {
    type: 'ADD_TASK_APPROVED',
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