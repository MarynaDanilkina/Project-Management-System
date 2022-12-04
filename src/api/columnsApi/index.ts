import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOptions, makeOptionsWithoutBody } from 'api/apiUtils/makeOptions';
import makeRequest from 'api/apiUtils/makeRequest';
import { BASE_URL } from 'api/apiUtils/utils';

interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

const getAllColumns = async (token: string, boardId: string): Promise<IColumn[]> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns`,
    200,
    makeOptionsWithoutBody(token)
  );
  return response;
};

export const fetchGetAllColumns = createAsyncThunk(
  'columns/fetchGetAllColumns',
  async ({ token, boardId }: { token: string; boardId: string }): Promise<IColumn[]> => {
    const response = await getAllColumns(token, boardId);
    return response;
  }
);

type CreateColumnParams = {
  token: string;
  boardId: string;
  title: string;
  order: number;
};

const createColumn = async ({
  token,
  title,
  order,
  boardId,
}: CreateColumnParams): Promise<IColumn> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns`,
    200,
    makeOptions({ title, order }, 'POST', token)
  );
  return response;
};

export const fetchCreateColumn = createAsyncThunk(
  'columns/fetchCreateColumn',
  async ({ title, token, boardId, order }: CreateColumnParams): Promise<IColumn> => {
    const response = await createColumn({ title, token, boardId, order });
    return response;
  }
);

const getColumnById = async (
  token: string,
  boardId: string,
  columnId: string
): Promise<IColumn> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}`,
    200,
    makeOptionsWithoutBody(token)
  );
  return response;
};

export const fetchGetColumnById = createAsyncThunk(
  'columns/fetchGetColumnById',
  async ({
    token,
    boardId,
    columnId,
  }: {
    token: string;
    boardId: string;
    columnId: string;
  }): Promise<IColumn> => {
    const response = await getColumnById(token, boardId, columnId);
    return response;
  }
);

const deleteColumn = async (token: string, boardId: string, columnId: string): Promise<boolean> => {
  const response = await makeRequest(
    `${BASE_URL}boards/${boardId}/columns/${columnId}`,
    200,
    makeOptionsWithoutBody(token, 'DELETE')
  );
  return response;
};

export const fetchDeleteColumn = createAsyncThunk(
  'columns/fetchDeleteColumn',
  async ({
    token,
    boardId,
    columnId,
  }: {
    token: string;
    boardId: string;
    columnId: string;
  }): Promise<boolean> => {
    const response = await deleteColumn(token, boardId, columnId);
    return response;
  }
);

type UpdateColumnParams = {
  title: string;
  order: number;
  token: string;
  boardId: string;
  columnId: string;
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

export const fetchUpdateColumn = createAsyncThunk(
  'columns/fetchUpdateColumn',
  async ({ title, order, token, boardId, columnId }: UpdateColumnParams): Promise<IColumn> => {
    const response = await updateColumn(title, order, token, boardId, columnId);
    return response;
  }
);
