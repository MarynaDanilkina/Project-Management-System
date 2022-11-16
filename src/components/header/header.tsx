import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateToken, selectToken } from 'toolkitRedux/userSlice/userSlice';
import '../../pages/welcome/welcome.sass';
import './header.sass';
import { useAppDispatch } from 'interface/interface';

const Header = () => {
  const token = useSelector(selectToken);
  const dispatch = useAppDispatch();
  const onExitHandle = () => dispatch(updateToken(null));
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

          {!token && (
            <>
              <div className="nav__log-in">
                <Link to="/log-in">Войти</Link>
              </div>
              <div className="nav__sign-up-home">
                <Link to="/sign-up">Зарегистрироваться</Link>
              </div>
            </>
          )}

          {token && (
            <>
              <div className="nav__item">
                <Link to="/">+ Новая доска</Link>
              </div>
              <div className="nav__item">
                <Link to="/profile">Профиль</Link>
              </div>
              <div className="nav__log-in" onClick={onExitHandle}>
                <p>Выйти</p>
              </div>
              <div className="nav__sign-up-home">
                <Link to="/boards">На главную</Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
