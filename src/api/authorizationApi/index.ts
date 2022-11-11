import { IToken, IUser } from '../contracts';
import makeRequest from '../apiUtils/makeRequest';
import { makeOptions } from '../apiUtils/makeOptions';
import { BASE_URL } from 'api/apiUtils/utils';

const signUp = async (name: string, login: string, password: string): Promise<IUser> => {
  const options = makeOptions({ name, login, password });
  const response = await makeRequest(BASE_URL + 'signup', 201, options);
  return response;
};

const signIn = async (login: string, password: string): Promise<IToken> => {
  const options = makeOptions({ login, password });
  const response = await makeRequest(BASE_URL + 'signin', 201, options);
  return response;
};

export { signUp, signIn };
