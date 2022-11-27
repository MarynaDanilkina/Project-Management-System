import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from 'context/colorThemeMui';

import TextInput from 'components/input';
import { useAppDispatch, useAppSelector, UserUpDate } from 'interface/interface';

import '../Profile/Profile.sass';
import fetchSignIn from 'toolkitRedux/userSlice/fetchSignInThunk';
import { useNavigate } from 'react-router-dom';
import { cleanError, selectError, selectIsLoading } from 'toolkitRedux/userSlice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Backdrop from 'components/backdrop';
import { useTranslation } from 'react-i18next';

export type SignInData = Omit<UserUpDate, 'name'>;

const SignIn = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInData>();
  const dispatch = useAppDispatch();
  const authorizationError = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignInData) => {
    dispatch(fetchSignIn(data))
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
      <Backdrop open={isLoading} />
      <Grid sx={{ jusctifyContent: 'center' }}>
        <Typography variant="h3" component="h1" textAlign="center" mt="2rem" mb="3rem">
          {t('log-in')}
        </Typography>
        <form className="profile__forms" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__forms-container">
            <TextInput register={register} name="login" label={t('login')} error={errors?.login} />
            <TextInput
              register={register}
              name="password"
              label={t('password')}
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
                  {t('log-in')}
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

export default SignIn;
