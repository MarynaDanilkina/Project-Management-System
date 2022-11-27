import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateToken, selectToken } from 'toolkitRedux/userSlice/userSlice';
import '../../pages/welcome/welcome.sass';
import './header.sass';
import { useAppDispatch } from 'interface/interface';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const token = useSelector(selectToken);
  const dispatch = useAppDispatch();
  const onExitHandle = () => dispatch(updateToken(null));

  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    let lang = 'en';
    if (t('language') === 'en') lang = 'ru';
    i18n.changeLanguage(lang);
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <Link to="/">
            <img src="/logo.png" className="header__logo" />
          </Link>
          <h1>team board</h1>
        </div>
        <nav className="nav">
          <div className="nav__lang" onClick={changeLanguage}>
            {t('language')}
          </div>

          {!token && (
            <>
              <div className="nav__log-in">
                <Link to="/log-in">{t('log-in')}</Link>
              </div>
              <div className="nav__sign-up-home">
                <Link to="/sign-up">{t('sign-in')}</Link>
              </div>
            </>
          )}

          {token && (
            <>
              <div className="nav__item">
                <Link to="/">+ {t('new_board')}</Link>
              </div>
              <div className="nav__item">
                <Link to="/profile">{t('profile')}</Link>
              </div>
              <div className="nav__log-in" onClick={onExitHandle}>
                <p>{t('log-out')}</p>
              </div>
              <div className="nav__sign-up-home">
                <Link to="/boards">{t('home_page')}</Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
