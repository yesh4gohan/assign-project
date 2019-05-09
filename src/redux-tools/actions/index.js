import {getAllUsers,getUserRepos} from '../../api/apiCallHandler';
import {SET_ALL_USERS,SET_USER_REPO,EDIT_USER_REPO,DELETE_USER_REPO} from './actionTypes';

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
    type:DELETE_USER_REPO,
    payload:newRepo
  })
}


export const editRepo = (username,editObj,id) => async dispatch => {
  const repos = await getUserRepos(username);
  let repoCopy;
  Array.isArray(repos)?repoCopy = [...repos]:repoCopy = [].concat(repos);
  let repoToBeEdited = {...repoCopy.filter((rep)=> (rep.id === id))[0]};
  repoToBeEdited.name = editObj.name;
  repoToBeEdited.description = editObj.desc;
  repoToBeEdited.language = editObj.language;
  let newRepo = repoCopy.filter((rep)=> (rep.id !== id));
  newRepo.unshift(repoToBeEdited);
  dispatch({
    type:EDIT_USER_REPO,
    payload:newRepo
  })
}