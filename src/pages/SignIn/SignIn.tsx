import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from 'context/colorThemeMui';

import TextInput from 'components/input';
import { UserUpDate } from 'interface/interface';

import '../Profile/Profile.sass';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpDate>();
  return (
    <Container>
      <Grid sx={{ jusctifyContent: 'center' }}>
        <Typography variant="h3" component="h1" textAlign="center" mt="2rem" mb="3rem">
          Войти
        </Typography>
        <form className="profile__forms" onSubmit={handleSubmit(() => {})}>
          <div className="profile__forms-container">
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
                  disabled={Object.keys(errors).length !== 0}
                >
                  Войти
                </Button>
              </ThemeProvider>
            </Grid>
          </div>
        </form>
      </Grid>
    </Container>
  );
};

export default SignIn;
