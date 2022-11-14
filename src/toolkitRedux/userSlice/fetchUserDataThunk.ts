import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from 'api/usersApi';
import { parseJwt } from '../../api/apiUtils/utils';

export type UserData = {
  userId: string;
  name: string;
  login: string;
};

const fetchUserData = createAsyncThunk('user/fetchUserData', async (token: string) => {
  const userId = parseJwt(token).userId;
  const user = await getUserById(token, userId);
  const useData: UserData = {
    name: user.name,
    login: user.login,
    userId,
  };
  return useData;
});

export default fetchUserData;
