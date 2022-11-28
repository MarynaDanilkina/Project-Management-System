import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import AllBoard from 'pages/AllBoard/AllBoard';
import BoardID from 'pages/BoardID/BoardID';
import SignUp from 'pages/SignUp/SingUp';
import SignIn from 'pages/SignIn/SignIn';
import Profile from 'pages/Profile/Profile';
import Welcome from 'pages/welcome/welcome';
import React, { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import LocalStore from 'utility/localStore/localStore';
import { useAppDispatch } from 'interface/interface';
import { updateToken } from 'toolkitRedux/userSlice/userSlice';
import fetchUserData from 'toolkitRedux/userSlice/fetchUserDataThunk';
import AddColumnDialogWindow from './components/addColumnDialogWindow';

function App() {
  const dispatch = useAppDispatch();
  const localStore = new LocalStore();
  const token = localStore.getValue();
  if (token) {
    dispatch(updateToken(token));
    dispatch(fetchUserData(token));
  }

  const ref = useRef<HTMLInputElement>(null!);
  const onOk = () => console.log(ref.current.value);

  return (
    <>
      <AddColumnDialogWindow
        ref={ref}
        onClose={() => {}}
        onFocus={() => {}}
        onOk={onOk}
        isModalOpen={true}
        titleError={false}
      />
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
    </>
  );
}

export default App;
