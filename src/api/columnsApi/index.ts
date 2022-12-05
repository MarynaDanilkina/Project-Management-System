import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOptions, makeOptionsWithoutBody } from 'api/apiUtils/makeOptions';
import makeRequest from 'api/apiUtils/makeRequest';
import { BASE_URL } from 'api/apiUtils/utils';
import { Column } from 'api/contracts';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export const fetchGetAllColumns = createAsyncThunk(
  'columns/fetchGetAllColumns',
  async ({ token, boardId }: { token: string; boardId: string }): Promise<IColumn[]> => {
    const response = await makeRequest(
      `${BASE_URL}boards/${boardId}/columns`,
      200,
      makeOptionsWithoutBody(token)
    );
    return response;
  }
);
//const getAllColumns = async (token: string, boardId: string): Promise<IColumn[]> => {
//  const response = await makeRequest(
//    `${BASE_URL}boards/${boardId}/columns`,
//    200,
//    makeOptionsWithoutBody(token)
//  );
//  return response;
//};
export const fetchCreateColumn = createAsyncThunk(
  'columns/fetchCreateColumn',
  async ({
    title,
    token,
    boardId,
  }: {
    title: string;
    token: string;
    boardId: string;
  }): Promise<IColumn> => {
    const response = await makeRequest(
      `${BASE_URL}boards/${boardId}/columns`,
      201,
      makeOptions({ title }, 'POST', token)
    );
    return response;
  }
);
//const createColumn = async (title: string, token: string, boardId: string): Promise<IColumn> => {
//  const response = await makeRequest(
//    `${BASE_URL}boards/${boardId}/columns`,
//    201,
//    makeOptions({ title }, 'POST', token)
//  );
//  return response;
//};

const getColumnById = async (token: string, boardId: string, columnId: string): Promise<Column> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}`,
    200,
    makeOptionsWithoutBody(token)
  );
  return response;
};

const deleteColumn = async (token: string, boardId: string, columnId: string): Promise<boolean> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}`,
    204,
    makeOptionsWithoutBody(token, 'DELETE')
  );
  return response;
};

const updateColumn = async (
  title: string,
  order: number,
  token: string,
  boardId: string,
  columnId: string
): Promise<IColumn> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}`,
    200,
    makeOptions({ title, order }, 'PUT', token)
  );
  return response;
};

export { getColumnById, deleteColumn, updateColumn };
