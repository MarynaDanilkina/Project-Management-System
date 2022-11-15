import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from 'context/colorThemeMui';

import TextInput from 'components/input';
import { useAppDispatch, useAppSelector, UserUpDate } from 'interface/interface';

import '../Profile/Profile.sass';
import fetchSignUp from 'toolkitRedux/userSlice/fetchSignUpThunk';
import { useNavigate } from 'react-router-dom';
import { cleanError, selectError } from 'toolkitRedux/userSlice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpDate>();
  const dispatch = useAppDispatch();
  const authorizationError = useAppSelector(selectError);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: UserUpDate) => {
    dispatch(fetchSignUp(data))
      .then(unwrapResult)
      .then(() => {
        setIsSubmitted(true);
        navigate('/');
      })
      .catch(() => setIsSubmitted(false));
  };

  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted, reset]);

  useEffect(() => {
    return () => {
      dispatch(cleanError());
    };
  }, [dispatch]);

  return (
    <Container>
      <Grid sx={{ jusctifyContent: 'center' }}>
        <Typography variant="h3" component="h1" textAlign="center" mt="2rem" mb="3rem">
          Создать новый аккаунт
        </Typography>
        <form className="profile__forms" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__forms-container">
            <TextInput register={register} name="name" label="Имя" error={errors?.name} />
            <TextInput register={register} name="login" label="Логин" error={errors?.login} />
            <TextInput
              register={register}
              name="password"
              label="Пароль"
              type="password"
              error={errors?.password}
            />
            <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: '250px', height: '3rem', my: '2rem', justifySelf: 'center' }}
                  disabled={Object.keys(errors).length !== 0 && !authorizationError}
                >
                  Регистрация
                </Button>
              </ThemeProvider>
            </Grid>
            {authorizationError && (
              <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
                <Alert severity="error" sx={{ fontSize: '1.4rem' }}>
                  {authorizationError}
                </Alert>
              </Grid>
            )}
          </div>
        </form>
      </Grid>
    </Container>
  );
};

export default SignUp;
