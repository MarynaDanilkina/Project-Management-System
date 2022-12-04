import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'interface/interface';
import LocalStore from 'utility/localStore/localStore';
import fetchDeleteUser from './fetchDeleteUser';
import fetchSignIn from './fetchSignInThunk';
import fetchSignUp from './fetchSignUpThunk';
import fetchUpdateThunk from './fetchUpdateThunk';
import fetchUserData, { UserData } from './fetchUserDataThunk';
import fetchUsersThunk from './fetchUsersThunk';
import { IUser } from '../../api/usersApi';

export type userSliceState = {
  isLoading: boolean;
  token: string | null;
  error: null | string;
  userData: UserData | null;
  users: IUser[] | null;
};

const getInitialUserState = (
  token: string | null = null,
  error: string | null = null
): userSliceState => ({
  token,
  error,
  userData: null,
  isLoading: false,
  users: null,
});

const localStore = new LocalStore();

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialUserState(),
  reducers: {
    updateToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
      localStore.updateValue(payload);
    },
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignIn.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.isLoading = false;
      state.userData = payload.user;
      if (state.error) {
        state.error = null;
      }
      localStore.updateValue(payload.token);
    });
    builder.addCase(fetchSignIn.rejected, (state, { error }) => {
      state.token = null;
      state.isLoading = false;
      localStore.updateValue(null);
      state.error = error.message ?? 'Something went wrong.';
    });
    builder.addCase(fetchSignUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message ?? 'Something went wrong.';
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.userData = { userId: payload.userId, name: payload.name, login: payload.login };
      state.isLoading = false;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.token = null;
      state.isLoading = false;
      localStore.updateValue(null);
    });
    builder.addCase(fetchUpdateThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpdateThunk.fulfilled, (state, { payload }) => {
      state.userData = { userId: payload.userId, name: payload.name, login: payload.login };
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(fetchUpdateThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message ?? 'Something wrong';
    });

    builder.addCase(fetchDeleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeleteUser.rejected, (state, { error }) => {
      state = getInitialUserState();
      state.error = error.message ?? 'Something went wrong';
      localStore.updateValue(null);
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state) => {
      state.token = null;
      state.isLoading = false;
      state.userData = null;
      state.error = null;
      localStore.updateValue(null);
    });
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsersThunk.rejected, (state, { error }) => {
      state = getInitialUserState();
      state.error = error.message ?? 'Something went wrong';
      localStore.updateValue(null);
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.users = payload;
    });
  },
});

export const { cleanError, updateToken } = userSlice.actions;

const selectToken = (state: RootState) => state.user.token;
const selectError = (state: RootState) => state.user.error;
const selectUser = (state: RootState) => state.user.userData;
const selectUsers = (state: RootState) => state.user.users;
const selectIsLoading = (state: RootState) => state.user.isLoading;

export { selectToken, selectError, selectUser, selectIsLoading, selectUsers };

export default userSlice.reducer;
