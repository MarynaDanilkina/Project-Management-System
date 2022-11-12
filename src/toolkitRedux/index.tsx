import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './toolkitReducer';
const store = configureStore({
  reducer: boardReducer,
});
export default store;
