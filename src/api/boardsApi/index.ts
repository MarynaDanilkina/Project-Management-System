import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOptions, makeOptionsWithoutBody } from 'api/apiUtils/makeOptions';
import makeRequest from 'api/apiUtils/makeRequest';
import { BASE_URL } from 'api/apiUtils/utils';
import { IBoardDetailed } from 'api/contracts';

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

const getAllBoards = async (token: string): Promise<IBoard[]> => {
  const response = await makeRequest(BASE_URL + 'boards', 200, makeOptionsWithoutBody(token));
  return response;
};

export const fetchAllBoards = createAsyncThunk(
  'boards/fetchAllBoards',
  async (token: string): Promise<IBoard[]> => {
    const response = await getAllBoards(token);
    console.log(response, 'all boards');
    return response;
  }
);

type FetchBoardParams = IBoard & {
  token: string;
};

const createBoard = async ({
  token,
  title,
  users,
  owner,
}: Omit<FetchBoardParams, '_id'>): Promise<IBoard> => {
  const response = await makeRequest(
    BASE_URL + 'boards',
    200,
    makeOptions({ title, owner, users }, 'POST', token)
  );
  console.log(response, 'new board');
  return response;
};

export const fetchCreateBoard = createAsyncThunk(
  'boards/fetchCreateBoard',
  async ({ title, users, owner, token }: FetchBoardParams): Promise<IBoard> => {
    const response = await createBoard({ title, users, owner, token });
    return response;
  }
);

const getBoardById = async (token: string, id: string): Promise<IBoardDetailed> => {
  const response = await makeRequest(BASE_URL + `boards/${id}`, 200, makeOptionsWithoutBody(token));
  console.log('boardByID', response);
  return response;
};

export const fetchGetBoardById = createAsyncThunk(
  'boards/fetchGetBoardById',
  async ({ token, id }: { token: string; id: string }): Promise<IBoardDetailed> => {
    const response = await getBoardById(token, id);
    return response;
  }
);

const deleteBoard = async (token: string, id: string): Promise<IBoard> => {
  const response = await makeRequest(
    BASE_URL + `boards/${id}`,
    200,
    makeOptionsWithoutBody(token, 'DELETE')
  );
  console.log('deletedBoard', response);
  return response;
};
export const fetchDeleteBoard = createAsyncThunk(
  'boards/fetchDeleteBoard',
  async ({ token, id }: { token: string; id: string }): Promise<string> => {
    await deleteBoard(token, id);
    return id;
  }
);

const updateBoard = async ({
  _id,
  token,
  users,
  owner,
  title,
}: FetchBoardParams): Promise<IBoard> => {
  const response = await makeRequest(
    BASE_URL + `boards/${_id}`,
    200,
    makeOptions({ title, owner, users }, 'PUT', token)
  );
  console.log('updatedBoard', response);
  return response;
};

export const fetchUpdateBoard = createAsyncThunk(
  'boards/fetchUpdateBoard',
  async ({ title, users, token, _id, owner }: FetchBoardParams): Promise<IBoard> => {
    const response = await updateBoard({ title, token, users, owner, _id });
    return response;
  }
);
