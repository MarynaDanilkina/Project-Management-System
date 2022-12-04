import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOptions, makeOptionsWithoutBody } from 'api/apiUtils/makeOptions';
import makeRequest from 'api/apiUtils/makeRequest';
import { BASE_URL } from 'api/apiUtils/utils';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: File[];
}

interface ITaskResponse {
  id: string;
  title: string;
  description: string;
  userId: string;
}

// не изменен, нигде не используется
const getAllTasks = async (token: string, boardId: string, columnId: string): Promise<ITask[]> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
    200,
    makeOptionsWithoutBody(token)
  );
  return response;
};

type createTaskProps = {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  description: string;
  userId: number;
  users: Array<string>;
  token: string;
};

const createTask = async (
  boardId: string,
  columnId: string,
  title: string,
  order: number,
  description: string,
  userId: number,
  users: Array<string>,
  token: string
): Promise<ITaskResponse> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
    201,
    makeOptions({ title, order, description, userId, users }, 'POST', token)
  );
  return response;
};

export const fetchCreateTask = createAsyncThunk(
  'task/fetchCreateTask',
  async ({
    boardId,
    columnId,
    title,
    order,
    description,
    userId,
    users,
    token,
  }: createTaskProps): Promise<ITaskResponse> => {
    const response = await createTask(
      boardId,
      columnId,
      title,
      order,
      description,
      userId,
      users,
      token
    );
    return response;
  }
);

// не изменен, нигде не используется
const getTaskById = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string
): Promise<ITask> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    200,
    makeOptionsWithoutBody(token)
  );
  return response;
};

type IResponseDeleteTask = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: Array<string>;
};

const deleteTask = async (
  taskId: string,
  boardId: string,
  columnId: string,
  token: string
): Promise<IResponseDeleteTask> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    200,
    makeOptionsWithoutBody(token, 'DELETE')
  );
  return response;
};

export const fetchDeleteTask = createAsyncThunk(
  'task/fetchDeleteTask',
  async ({
    taskId,
    boardId,
    columnId,
    token,
  }: {
    taskId: string;
    boardId: string;
    columnId: string;
    token: string;
  }): Promise<IResponseDeleteTask> => {
    const response = await deleteTask(taskId, boardId, columnId, token);
    return response;
  }
);

const updateTask = async (
  title: string,
  order: number,
  description: string,
  token: string,
  boardId: string,
  columnId: string,
  taskId: string,
  userId: string,
  users: Array<string>
): Promise<{
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: Array<string>;
}> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    200,
    makeOptions({ title, order, description, userId, boardId, columnId, users }, 'PUT', token)
  );
  return response;
};

export const fetchUpdateTask = createAsyncThunk(
  'task/fetchUpdateTask',
  async ({
    taskId,
    boardId,
    columnId,
    token,
  }: {
    taskId: string;
    boardId: string;
    columnId: string;
    token: string;
  }): Promise<IResponseDeleteTask> => {
    const response = await deleteTask(taskId, boardId, columnId, token);
    return response;
  }
);

export { getTaskById, deleteTask, updateTask };
