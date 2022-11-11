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

/*
 */

function App() {
  /*
  deleteUser(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8',
    'ef1436c8-c254-4754-8874-0d88e48bec83'
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  */
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
