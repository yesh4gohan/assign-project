import {getAllUsers,getUserRepos} from '../../api/apiCallHandler';
import {SET_ALL_USERS,SET_USER_REPO} from './actionTypes';

export const setAllUsers = () => async dispatch => {
  const users = await getAllUsers();
  dispatch({
    type:SET_ALL_USERS,
    payload:users
  })
}

export const setUserRepos = (name) => async dispatch => {
  
  const repos = await getUserRepos(name);
  let repoCopy;
  Array.isArray(repos)?repoCopy = [...repos]:repoCopy = [].concat(repos);
  dispatch({
    type:SET_USER_REPO,
    payload:repoCopy
  })
}

export const deleteRepo = (name,id) => async dispatch => {

  const repos = await getUserRepos(name);
  
  let repoCopy;
  Array.isArray(repos)?repoCopy = [...repos]:repoCopy = [].concat(repos);

  let newRepo = repoCopy.filter((rep)=> (rep.id !== id));
  dispatch({
    type:SET_USER_REPO,
    payload:newRepo
  })
}
