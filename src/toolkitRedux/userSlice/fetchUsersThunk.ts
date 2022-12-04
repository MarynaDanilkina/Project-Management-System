import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from 'api/usersApi';
import { getErrorMessage } from '../../api/apiUtils/utils';

const fetchUsersThunk = createAsyncThunk('user/fetchUsersThunk', async (token: string) => {
  try {
    const users = await getAllUsers(token);
    return users;
  } catch (err) {
    throw getErrorMessage(err);
  }
});

export default fetchUsersThunk;
