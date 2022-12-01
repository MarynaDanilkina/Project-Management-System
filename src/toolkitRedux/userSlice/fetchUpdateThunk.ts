import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from 'api/apiUtils/utils';
import { updateUser } from 'api/usersApi';
import { UserUpDate } from 'interface/interface';
import { UserData } from './fetchUserDataThunk';

interface Data extends UserUpDate {
  token: string;
  id: string;
}

const fetchUpdateThunk = createAsyncThunk(
  'user/updateThunk',
  async ({ name, login, password, token, id }: Data) => {
    try {
      const user = await updateUser(name, login, password, token, id);
      const userData: UserData = {
        name: user.name,
        login: user.login,
        userId: id,
      };
      return userData;
    } catch (err) {
      console.log(err);
      const errMsg = getErrorMessage(err);
      throw errMsg;
    }
  }
);

export default fetchUpdateThunk;
