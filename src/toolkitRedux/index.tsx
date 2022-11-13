import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './BoardsReducer';
const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});
export default store;
