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

function App() {
  const localStore = new LocalStore();
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/log-in" element={<SignIn localStore={localStore} />} />
        <Route path="/sign-up" element={<SignUp localStore={localStore} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boards" element={<AllBoard />} />
        <Route path="/board/:id" element={<BoardID />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
