import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from 'toolkitRedux';

export interface UserUpDate {
  name: string;
  login: string;
  password: string;
}
export interface IBoards {
  id: string;
  title: string;
  description: string;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
