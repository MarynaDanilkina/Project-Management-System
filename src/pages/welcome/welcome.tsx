import React from 'react';

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__wrapper">
        <div className="welcome__info-container">
          <div className="welcome__info">
            <h2>
              team board Объедит все в одном месте, даже если участники вашей команды рассеяны по
              миру.
            </h2>
            <p>Это не просто работа. Это общее дело.</p>
            <div className="welcome__info-button">
              <button className="button__welcome">О нас</button>
              <button className="button__welcome">Начать</button>
            </div>
          </div>
          <div className="welcome__info-img">
            <img src="./welcome.png" alt="welcome" />
          </div>
        </div>
        <div className="welcome__video-container">
          <div className="welcome__video-wrapper">
            <h2>Как работать с приложением</h2>
            <div>
              <div className="welcome__video"></div>
            </div>
          </div>
        </div>
        <div className="welcome__team-container">
          <div className="welcome__team-wrapper">
            <h2>Наша команда</h2>
            <div className="welcome__teams">
              <div className="welcome__team">
                <div className="team">
                  <div className="team__img-bg">
                    <div id="Maryna" className="team__img"></div>
                  </div>
                  <p>Текст</p>
                </div>
              </div>
              <div className="welcome__team">
                <div className="team">
                  <div className="team__img-bg">
                    <div id="Khalid" className="team__img"></div>
                  </div>
                  <p>Текст</p>
                </div>
              </div>
              <div className="welcome__team">
                <div className="team">
                  <div className="team__img-bg">
                    <div id="Kseniya" className="team__img"></div>
                  </div>
                  <p>Текст</p>
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
