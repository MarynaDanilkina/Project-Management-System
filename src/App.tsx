import Header from 'components/header/header';
import Welcome from 'pages/welcome/welcome';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/log-in" element={<Welcome />} />
        <Route path="/sign-up" element={<Welcome />} />
        <Route path="/profile" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/board/:id" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
