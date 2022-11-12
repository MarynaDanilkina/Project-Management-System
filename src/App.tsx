import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import AllBoard from 'pages/AllBoard/AllBoard';
import Board from 'pages/Board/Board';
import LogIn from 'pages/LogIn/LogIn';
import Profile from 'pages/Profile/Profile';
import Registration from 'pages/Registration/Registration';
import Welcome from 'pages/welcome/welcome';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boards" element={<AllBoard />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
