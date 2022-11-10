import React from 'react';
import { Link } from 'react-router-dom';
import './header.sass';

const Header = () => {
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
          <div className="nav__lang">RU</div>
          <div className="nav__log-in">
            <Link to="/log-in">Войти</Link>
          </div>
          <div className="nav__sign-up-home">
            <Link to="/sign-up">Зарегистрироваться</Link>
          </div>

          <div className="nav__item">
            <Link to="/">+ Новая доска</Link>
          </div>
          <div className="nav__item">
            <Link to="/profile">Профиль</Link>
          </div>
          <div className="nav__log-in">
            <p>Выйти</p>
          </div>
          <div className="nav__sign-up-home">
            <Link to="/boards">На главную</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
