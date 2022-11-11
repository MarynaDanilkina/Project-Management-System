import { makeOptions, makeOptionsWithoutBody } from 'api/apiUtils/makeOptions';
import makeRequest from 'api/apiUtils/makeRequest';
import { BASE_URL } from 'api/apiUtils/utils';
import { IBoardDetailed } from 'api/contracts';

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

const getAllBoards = async (token: string): Promise<IBoard[]> => {
  const response = await makeRequest(BASE_URL + 'boards', 200, makeOptionsWithoutBody(token));
  return response;
};

const createBoard = async (title: string, description: string, token: string): Promise<IBoard> => {
  const response = await makeRequest(
    BASE_URL + 'boards',
    201,
    makeOptions({ title, description }, 'POST', token)
  );
  return response;
};

const getBoardById = async (token: string, id: string): Promise<IBoardDetailed> => {
  const response = await makeRequest(BASE_URL + `boards/${id}`, 200, makeOptionsWithoutBody(token));
  return response;
};

const deleteBoard = async (token: string, id: string): Promise<boolean> => {
  const response = await makeRequest(
    BASE_URL + `boards/${id}`,
    204,
    makeOptionsWithoutBody(token, 'DELETE')
  );
  return response;
};

const updateBoard = async (
  title: string,
  description: string,
  token: string,
  id: string
): Promise<IBoard> => {
  const response = await makeRequest(
    BASE_URL + `boards/${id}`,
    200,
    makeOptions({ title, description }, 'PUT', token)
  );
  return response;
};

export { getAllBoards, getBoardById, deleteBoard, updateBoard, createBoard };
