import {combineReducers} from 'redux';
import users from './usersReducer';
import repos from './reposReducer';
export default combineReducers({
  users,
  repos
});