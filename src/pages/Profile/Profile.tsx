import React from 'react';
import './Profile.sass';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserUpDate } from 'interface/interface';
import ProfileInfo from '../../components/ProfileInfo/';
import TextInput from 'components/input';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpDate>();

  const onSubmit: SubmitHandler<UserUpDate> = (data) => {
    console.log(data);
  };

  return (
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
        <ProfileInfo name="Ivan" login="Ivanow" />
        <div className="profile__form-container">
          <div className="profile__form-wrapper">
            <h2>Редактировать профиль</h2>
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
                <div className="profile__form-button">
                  <button
                    className="profile__form-save"
                    type="submit"
                    disabled={Object.keys(errors).length !== 0}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="profile__delete-container">
          <button className="profile__form-delete">Удалить аккаунт</button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
