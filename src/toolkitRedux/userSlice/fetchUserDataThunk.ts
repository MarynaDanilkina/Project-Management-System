import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from 'api/usersApi';
import { getErrorMessage, parseJwt } from '../../api/apiUtils/utils';

export type UserData = {
  userId: string;
  name: string;
  login: string;
};

const fetchUserData = createAsyncThunk('user/fetchUserData', async (token: string) => {
  const userId = parseJwt(token).userId;
  try {
    const user = await getUserById(token, userId);
    const useData: UserData = {
      name: user.name,
      login: user.login,
      userId,
    };
    return useData;
  } catch (err) {
    throw getErrorMessage(err);
  }
});

export default fetchUserData;
