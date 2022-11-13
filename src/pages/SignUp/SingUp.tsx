import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from 'context/colorThemeMui';

import TextInput from 'components/input';
import { UserUpDate } from 'interface/interface';

import '../Profile/Profile.sass';
import LocalStore from 'utility/localStore/localStore';
import { signIn, signUp } from 'api/authorizationApi';

type SignUpProps = { localStore: LocalStore };

const SignUp = ({ localStore }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpDate>();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: UserUpDate) => {
    signUp(data.name, data.login, data.password).then((responseSignUp) => {
      console.log('response signUp', responseSignUp);
      signIn(data.login, data.password).then((response) => {
        localStore.updateValue(response.token);
        console.log('response signIn', response);
        console.log('data', data);
        setIsSubmitted(true);
      });
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted, reset]);
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
                  disabled={Object.keys(errors).length !== 0}
                >
                  Регистрация
                </Button>
              </ThemeProvider>
            </Grid>
          </div>
        </form>
      </Grid>
    </Container>
  );
};

export default SignUp;
