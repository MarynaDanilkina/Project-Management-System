import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from 'api/apiUtils/utils';
import { signIn } from 'api/authorizationApi';
import { SignInData } from 'pages/SignIn/SignIn';

const fetchSignIn = createAsyncThunk('user/signIn', async (userData: SignInData) => {
  try {
    const { token } = await signIn(userData.login, userData.password);
    return token;
  } catch (err) {
    const errMsg = getErrorMessage(err);
    throw errMsg;
  }
});

export default fetchSignIn;
