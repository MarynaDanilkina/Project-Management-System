import React from 'react';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <div className="welcome">
      <div className="welcome__wrapper">
        <div className="welcome__info-container">
          <div className="welcome__info">
            <h2> team board {t('main_page/intro/title')} </h2>
            <p>{t('main_page/intro/description')}</p>
            <div className="welcome__info-button">
              <button className="button__welcome">{t('about_us')}</button>
              <button className="button__welcome">{t('start')}</button>
            </div>
          </div>
          <div className="welcome__info-img">
            <img src="./welcome.png" alt="welcome" />
          </div>
        </div>
        <div className="welcome__team-container">
          <div className="welcome__team-wrapper">
            <h2>{t('our_team')}</h2>
            <div className="welcome__teams">
              <div className="welcome__team">
                <div className="team">
                  <div className="team__img-bg">
                    <div id="Maryna" className="team__img"></div>
                  </div>
                  <p>{t('our_team/maryna')}</p>
                </div>
              </div>
              <div className="welcome__team">
                <div className="team">
                  <div className="team__img-bg">
                    <div id="Khalid" className="team__img"></div>
                  </div>
                  <p>{t('our_team/khalid')}</p>
                </div>
              </div>
              <div className="welcome__team">
                <div className="team">
                  <div className="team__img-bg">
                    <div id="Kseniya" className="team__img"></div>
                  </div>
                  <p>{t('our_team/kseniya')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
