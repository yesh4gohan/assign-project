import {SET_ALL_USERS} from '../actions/actionTypes';

 const initialState = {

 };

 export default (state = initialState,action) => {
   switch (action.type) {
     case SET_ALL_USERS:
       return {
         ...state,
         users:action.payload
       }
   
     default:
       return state;
   }
 }