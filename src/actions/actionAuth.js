import axios from 'axios';

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

export function reloadToken() {
  const data = {
    token: localStorage.getItem('token')
  }
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] =  'JWT ' + token;
  axios.post(`https://trello.backend.tests.nekidaem.ru/api/v1/users/refresh_token/`, data)
    .then(res => localStorage.setItem('token', res.data.token))
}