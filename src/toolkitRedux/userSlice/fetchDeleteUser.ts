import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from 'api/apiUtils/utils';
import { deleteUser } from 'api/usersApi';

const fetchDeleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ token, id }: { token: string; id: string }) => {
    try {
      await deleteUser(token, id);
    } catch (err) {
      const errMsg = getErrorMessage(err);
      throw errMsg;
    }
  }
);

export default fetchDeleteUser;
