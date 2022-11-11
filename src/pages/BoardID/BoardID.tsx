import React from 'react';
import './BoardID.sass';

const Board = () => {
  return (
    <div className="Board__container">
      <div className="Board__wrapper">
        <div className="Board__prev">
          <span>Назад</span>
          <span>/Доска1</span>
        </div>
        <div className="Board__tasks-container">
          <div className="Board__tasks">
            <div className="Board__column">
              <h3>Сделать</h3>
              <div className="Board__column-items">
                <div className="Board__column-item">1</div>
              </div>
              <div className="add__column-tasks">
                <p>+ Добавить задачу</p>
              </div>
            </div>
            <div className="Board__column">
              <h3>Сделать</h3>
              <div className="Board__column-items">
                <div className="Board__column-item">1</div>
              </div>
              <div className="add__column-tasks">
                <p>+ Добавить задачу</p>
              </div>
            </div>
            <div className="Board__column">
              <h3>Сделать</h3>
              <div className="Board__column-items">
                <div className="Board__column-item">1</div>
              </div>
              <div className="add__column-tasks">
                <p>+ Добавить задачу</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
