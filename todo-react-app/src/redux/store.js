import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducers/tasksReducer'; 

const store = configureStore({
  reducer: {
   inputValues : tasksReducer, 
  },
});

export default store;
