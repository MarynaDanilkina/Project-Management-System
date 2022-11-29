import React, { useState } from 'react';

import { Alert, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector, UserUpDate } from 'interface/interface';
import { UserData } from '../../toolkitRedux/userSlice/fetchUserDataThunk';
import {
  selectError,
  selectIsLoading,
  selectToken,
  selectUser,
} from 'toolkitRedux/userSlice/userSlice';
import fetchDeleteUser from 'toolkitRedux/userSlice/fetchDeleteUser';
import fetchUpdateThunk from 'toolkitRedux/userSlice/fetchUpdateThunk';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ProfileInfo from '../../components/ProfileInfo/';
import TextInput from 'components/input';
import PasswordInput from '../../components/input/PasswordInput';
import Backdrop from 'components/backdrop';
import ConfirmDialogWindow from 'components/confirmDialogWindow';

import './Profile.sass';

const getProfileFormDefaultValues = (user: UserData | null) => ({
  name: user?.name ?? '',
  login: user?.login ?? '',
});

const Profile = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<UserUpDate>({ defaultValues: getProfileFormDefaultValues(user) });

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();
  const error = useAppSelector(selectError);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const onModalOk = () => {
    if (token && user) {
      dispatch(fetchDeleteUser({ id: user.userId, token })).then(() => {
        toggleIsModalOpen();
        navigate('/');
      });
    }
  };

  const onSubmit: SubmitHandler<UserUpDate> = (data) => {
    if (!Object.keys(touchedFields).length) {
      return;
    }
    if (token && user) {
      dispatch(fetchUpdateThunk({ ...data, token, id: user.userId }))
        .unwrap()
        .then(() => reset(data));
    }
  };
  return (
    <>
      <Backdrop open={isLoading} />
      {user && (
        <div className="profile__container">
          <svg display="none">
            <symbol id="user" viewBox="0 0 785.8159 1010">
              <g id="user-user">
                <path
                  fill="#77B2D3"
                  d="M392.9692,0c135.251,0,244.8565,109.5234,244.8565,244.6914c0,135.312-109.6055,244.8145-244.8565,244.8145
		c-135.1269,0-244.7734-109.5025-244.7734-244.8145C148.1958,109.5234,257.8423,0,392.9692,0z"
                />
                <path
                  fill="#77B2D3"
                  d="M785.8159,1010h-0.5762H0V876.8457c0-173.7793,109.3999-321.1318,261.9521-376.0586l131.0171,174.6016
		l130.9756-174.6016c152.5938,54.9268,261.8711,202.2793,261.8711,376.0586V1010z"
                />
              </g>
            </symbol>
          </svg>
          <div className="profile__wrapper">
            <ProfileInfo name={user.name} login={user.login} />
            <div className="profile__form-container">
              <div className="profile__form-wrapper">
                <h2>{t('edit_profile')}</h2>
                <form className="profile__forms" onSubmit={handleSubmit(onSubmit)}>
                  <div className="profile__forms-container">
                    <TextInput
                      register={register}
                      defaultValue={user.name}
                      name="name"
                      label={t('name')}
                      error={errors?.name}
                    />
                    <TextInput
                      register={register}
                      defaultValue={user.login}
                      name="login"
                      label={t('login')}
                      error={errors?.login}
                    />
                    <PasswordInput
                      register={register}
                      name="password"
                      label={t('password')}
                      error={errors?.password}
                    />
                    <div className="profile__form-button">
                      <button
                        className="profile__form-save"
                        type="submit"
                        disabled={Object.keys(errors).length !== 0}
                      >
                        {t('ok')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="profile__delete-container">
              <button className="profile__form-delete" onClick={toggleIsModalOpen}>
                {t('remove_profile')}
              </button>
            </div>
          </div>
          <ConfirmDialogWindow
            onOk={onModalOk}
            onClose={toggleIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      )}
      {error && (
        <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
          <Alert severity="error" sx={{ fontSize: '1.4rem' }}>
            {error}
          </Alert>
        </Grid>
      )}
    </>
  );
};

export default Profile;
