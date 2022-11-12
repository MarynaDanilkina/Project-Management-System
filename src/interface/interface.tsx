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

export interface ITasks {
  id: string;
  title: string;
  order: number;
  tasks: {
    id: string;
    title: string;
    order: number;
    done: boolean;
    description: string;
    userId: string;
    files: {
      filename: string;
      fileSize: number;
    }[];
  }[];
}
export type ITasksProps = {
  board: ITasks;
};
export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: {
    filename: string;
    fileSize: number;
  }[];
}
[];
export type ITaskProps = {
  task: ITask;
  board: ITasks;
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
