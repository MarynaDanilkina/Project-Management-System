import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from 'toolkitRedux';
import { ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction } from 'redux';

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
export type ThunkAction<TReturnType, TState, TExtraThunkArg, TBasicAction extends Action> = (
  dispatch: ThunkDispatch<TState, TExtraThunkArg, TBasicAction>,
  getState: () => TState,
  extraArgument: TExtraThunkArg
) => TReturnType;

export type AppThunk = ThunkAction<void, RootState, undefined, AnyAction>;
