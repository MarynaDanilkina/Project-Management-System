import { makeOptions, makeOptionsWithoutBody } from 'api/apiUtils/makeOptions';
import makeRequest from 'api/apiUtils/makeRequest';
import { BASE_URL } from 'api/apiUtils/utils';

export interface IUser {
  _id: string;
  name: string;
  login: string;
}

const getAllUsers = async (token: string): Promise<IUser[]> => {
  console.log('all users start');
  const response = await makeRequest(BASE_URL + 'users', 200, makeOptionsWithoutBody(token));
  console.log('all users', response);
  return response;
};

const getUserById = async (token: string, id: string): Promise<IUser> => {
  const response = await makeRequest(BASE_URL + `users/${id}`, 200, makeOptionsWithoutBody(token));
  return response;
};

const deleteUser = async (token: string, id: string): Promise<boolean> => {
  const response = await makeRequest(
    BASE_URL + `users/${id}`,
    200,
    makeOptionsWithoutBody(token, 'DELETE')
  );
  return response;
};

const updateUser = async (
  name: string,
  login: string,
  password: string,
  token: string,
  id: string
): Promise<IUser> => {
  const response = await makeRequest(
    BASE_URL + `users/${id}`,
    200,
    makeOptions({ name, login, password }, 'PUT', token)
  );
  return response;
};

export { getAllUsers, getUserById, deleteUser, updateUser };
