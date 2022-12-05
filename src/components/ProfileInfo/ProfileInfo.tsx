import React from 'react';
import { useTranslation } from 'react-i18next';

type ProfileProps = { name: string; login: string };

const ProfileInfo = ({ name, login }: ProfileProps) => {
  const { t } = useTranslation();

  return (
    <div className="profile__info-container">
      <div>
        <svg className="profile__userSVG">
          <use xlinkHref="#user"></use>
        </svg>
      </div>
      <div>
        <div className="profile__info-name">
          <span>{t('name')}:</span>
          <span className="profile-info">{name}</span>
        </div>
        <div className="profile__info-login">
          <span>{t('login')}:</span>
          <span className="profile-info">{login}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
