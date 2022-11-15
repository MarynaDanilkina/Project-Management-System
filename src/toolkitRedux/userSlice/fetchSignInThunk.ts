import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage, parseJwt } from 'api/apiUtils/utils';
import { signIn } from 'api/authorizationApi';
import { getUserById } from 'api/usersApi';
import { SignInData } from 'pages/SignIn/SignIn';

const fetchSignIn = createAsyncThunk('user/signIn', async (userData: SignInData) => {
  try {
    const { token } = await signIn(userData.login, userData.password);
    const { userId, login } = parseJwt(token);
    const user = await getUserById(token, userId);

    return {
      token,
      user: {
        userId,
        login,
        name: user.name,
      },
    };
  } catch (err) {
    const errMsg = getErrorMessage(err);
    throw errMsg;
  }
});

export default fetchSignIn;
