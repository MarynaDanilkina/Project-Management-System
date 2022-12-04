import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from 'api/usersApi';
import { getErrorMessage } from '../../api/apiUtils/utils';

const fetchUsersThunk = createAsyncThunk('user/fetchUsersThunk', async (token: string) => {
  try {
    const users = await getAllUsers(token);
    console.log(users, 'users');
    return users;
  } catch (err) {
    console.log(err, 'users');
    throw getErrorMessage(err);
  }
});

export default fetchUsersThunk;
