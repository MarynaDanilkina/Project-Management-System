import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from 'api/apiUtils/utils';
import { signUp } from 'api/authorizationApi';
import { UserUpDate } from 'interface/interface';

const fetchSignUp = createAsyncThunk('user/signUp', async (userData: UserUpDate) => {
  try {
    await signUp(userData.name, userData.login, userData.password);
  } catch (err) {
    const errMsg = getErrorMessage(err);
    throw errMsg;
  }
});

export default fetchSignUp;
