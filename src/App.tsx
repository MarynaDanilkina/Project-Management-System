import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import AllBoard from 'pages/AllBoard/AllBoard';
import BoardID from 'pages/BoardID/BoardID';
import SignUp from 'pages/SignUp/SingUp';
import SignIn from 'pages/SignIn/SignIn';
import Profile from 'pages/Profile/Profile';
import Welcome from 'pages/welcome/welcome';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LocalStore from 'utility/localStore/localStore';
import { useAppDispatch } from 'interface/interface';
import { updateToken } from 'toolkitRedux/userSlice/userSlice';
import fetchUserData from 'toolkitRedux/userSlice/fetchUserDataThunk';
import Svg from 'components/svg/svg';

function App() {
  const dispatch = useAppDispatch();
  const localStore = new LocalStore();
  const token = localStore.getValue();
  if (token) {
    dispatch(updateToken(token));
    dispatch(fetchUserData(token));
  }
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/log-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boards" element={<AllBoard />} />
        <Route path="/board/:id" element={<BoardID />} />
      </Routes>

      <Footer />
      <Svg />
    </>
  );
}

export default App;
