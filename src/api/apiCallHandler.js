import axios from 'axios';

export const getAllUsers = () => {
  return axios
  .get('https://api.github.com/users')
  .then(response => (response.data))
  .catch(err => console.log(err))
}

export const getUserRepos = name => {
  return axios
  .get(`https://api.github.com/users/${name}/repos`)
  .then(response => (response.data))
  .catch(err => console.log(err))
}