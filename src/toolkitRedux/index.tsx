import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './BoardsReducer';
import userReduccer from './userSlice/userSlice';

const store = configureStore({
  reducer: {
    user: userReduccer,
    boards: boardReducer,
  },
});

export default store;
