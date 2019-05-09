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
  //1.if the API was working for delete and post requests 
  /*
  let newRepo = [];
  repo = axios
  .delete(`https://api.github.com/users/mojombo/repos/${repoIId}`)
  .then(res =>{
    axios
    .get(`https://api.github.com/users/mojombo/repos/)
    .then(res=>{
      newRepo = res.data;
    })
  })
dispatch({
    type:DELETE_USER_REPO,
    payload:newRepo
  })
  */
  let newRepo = repoCopy.filter((rep)=> (rep.id !== id));
  dispatch({
    type:DELETE_USER_REPO,
    payload:newRepo
  })
}


export const editRepo = (username,editObj,id) => async dispatch => {
  const repos = await getUserRepos(username);
  let repoCopy;
  //if the API was working for delete and post requests 
  /*
  let newRepo = [];
  let repoToBeEdited = {};
  axios
  .get(`https://api.github.com/users/mojombo/repos/${repoIId}`)
  .then(res =>{
      repoToBeEdited  = {...res.data};
      repoToBeEdited.name = editObj.name;
      repoToBeEdited.description = editObj.desc;
      repoToBeEdited.language = editObj.language;
      axios.post(`https://api.github.com/users/mojombo/repos/${repoIId}`,repoToBeEdited)
      .then(()=>{
        axios get
        put it to newRepo
      })
    })
  })
  dispatch({
    type:DELETE_USER_REPO,
    payload:newRepo
  })
  */
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