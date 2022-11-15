import React from 'react';

type ProfileProps = { name: string; login: string };

const ProfileInfo = ({ name, login }: ProfileProps) => {
  return (
    <div className="profile__info-container">
      <div>
        <svg className="profile__userSVG">
          <use xlinkHref="#user"></use>
        </svg>
      </div>
      <div>
        <div className="profile__info-name">
          <span>Имя:</span>
          <span className="profile-info">{name}</span>
        </div>
        <div className="profile__info-login">
          <span>Логин:</span>
          <span className="profile-info">{login}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
