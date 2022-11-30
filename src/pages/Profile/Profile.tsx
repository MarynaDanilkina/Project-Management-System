import React from 'react';
import './Profile.sass';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector, UserUpDate } from 'interface/interface';
import ProfileInfo from '../../components/ProfileInfo/';
import TextInput from 'components/input';
import { selectUser } from 'toolkitRedux/userSlice/userSlice';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpDate>();
  const user = useAppSelector(selectUser);

  const onSubmit: SubmitHandler<UserUpDate> = (data) => {
    console.log(data);
  };

  return (
    <div className="profile__container">
      <div className="profile__wrapper">
        <ProfileInfo name={user?.name ?? ''} login={user?.login ?? ''} />
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
