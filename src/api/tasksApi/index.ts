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

const getAllTasks = async (token: string, boardId: string, columnId: string): Promise<ITask[]> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
    200,
    makeOptionsWithoutBody(token)
  );
  return response;
};
export const fetchCreateTask = createAsyncThunk(
  'task/fetchCreateTask',
  async ({
    title,
    description,
    userId,
    token,
    boardId,
    columnId,
  }: {
    title: string;
    description: string;
    userId: string;
    token: string;
    boardId: string;
    columnId: string;
  }) => {
    const response = await makeRequest(
      `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
      201,
      makeOptions({ title, description, userId }, 'POST', token)
    );
    return { columnId, task: response };
  }
);
//const createTask = async (
//  title: string,
//  description: string,
//  id: string,
//  token: string,
//  boardId: string,
//  columnId: string
//): Promise<ITaskResponse> => {
//  const response = await makeRequest(
//    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
//    201,
//    makeOptions({ title, description, id }, 'POST', token)
//  );
//  return response;
//};

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

const deleteTask = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string
): Promise<boolean> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    204,
    makeOptionsWithoutBody(token, 'DELETE')
  );
  return response;
};

const updateTask = async (
  title: string,
  order: number,
  description: string,
  token: string,
  boardId: string,
  columnId: string,
  taskId: string,
  userId: string
): Promise<{
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    200,
    makeOptions({ title, order, description, userId, boardId, columnId }, 'PUT', token)
  );
  return response;
};

export { getAllTasks, getTaskById, deleteTask, updateTask };
