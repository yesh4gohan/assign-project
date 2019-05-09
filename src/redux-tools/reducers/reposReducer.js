import {SET_USER_REPO,EDIT_USER_REPO,DELETE_USER_REPO} from '../actions/actionTypes';
 const initialState = {

 };

 export default (state = initialState,action) => {
   switch (action.type) {
     case SET_USER_REPO:
       return {
         ...state,
         repos:action.payload
       }
       case DELETE_USER_REPO:
       return {
         ...state,
         repos:action.payload
       }
       case EDIT_USER_REPO:
       return {
        ...state,
        repos:action.payload
      }
     default:
       return state;
   }
 }