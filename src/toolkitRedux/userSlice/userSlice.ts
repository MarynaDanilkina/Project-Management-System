import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'interface/interface';
import LocalStore from 'utility/localStore/localStore';
import fetchSignIn from './fetchSignInThunk';
import fetchSignUp from './fetchSignUpThunk';

export type userSliceState = { token: string | null; error: null | string };

const getInitialUserState = (token: string | null = null, error: string | null = null) => ({
  token,
  error,
});

const localStore = new LocalStore();

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialUserState(),
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, { payload }) => {
      state.token = payload;
      if (state.error) {
        state.error = null;
      }
      localStore.updateValue(payload);
    });
    builder.addCase(fetchSignIn.rejected, (state, { error }) => {
      if (error.message) {
        state.error = error.message;
      }
    });
    builder.addCase(fetchSignUp.fulfilled, (state, { payload }) => {
      state.token = payload;
      if (state.error) {
        state.error = null;
      }
      localStore.updateValue(payload);
    });
    builder.addCase(fetchSignUp.rejected, (state, { error }) => {
      if (error.message) {
        state.error = error.message;
      }
    });
  },
});

export const { cleanError } = userSlice.actions;

const selectToken = (state: RootState) => state.user.token;
const selectError = (state: RootState) => state.user.error;

export { selectToken, selectError };

export default userSlice.reducer;
