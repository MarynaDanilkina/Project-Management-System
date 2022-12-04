import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from 'api/usersApi';
import { getErrorMessage, parseJwt } from '../../api/apiUtils/utils';

export type UserData = {
  userId: string;
  name: string;
  login: string;
};

const fetchUserData = createAsyncThunk('user/fetchUserData', async (token: string) => {
  const { id } = parseJwt(token);
  try {
    const user = await getUserById(token, id);
    const userData: UserData = {
      name: user.name,
      login: user.login,
      userId: id,
    };

    return userData;
  } catch (err) {
    throw getErrorMessage(err);
  }
});

export default fetchUserData;
