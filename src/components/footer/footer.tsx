import React from 'react';
import './footer.sass';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__gitHub">
          <div className="footer__gitHub-a">
            <a href="https://github.com/salladin95">
              <div className="gh_logo__wrapper">
                <img src="/gh_logo.svg" className="gh_logo" />
              </div>
              <div className="gh_title">@Salladin95</div>
            </a>
            <a href="https://github.com/MarynaDanilkina">
              <div className="gh_logo__wrapper">
                <img src="/gh_logo.svg" className="gh_logo" />
              </div>
              <div className="gh_title">@MarynaDanilkina</div>
            </a>
            <a href="https://github.com/ry-ksu">
              <div className="gh_logo__wrapper">
                <img src="/gh_logo.svg" className="gh_logo" />
              </div>
              <div className="gh_title">@ry-ksu</div>
            </a>
          </div>
          <div className="footer_year">
            <div>2022</div>
          </div>
        </div>
        <div className="footer__logo">
          <div className="footer__logo__wrapper">
            <a href="https://rs.school/react/">
              <svg className="footer__logo">
                <use xlinkHref="#rss"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
