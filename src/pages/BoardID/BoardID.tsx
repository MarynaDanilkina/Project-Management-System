import BoardTasks from 'components/board_tasks/board_tasks';
import React from 'react';
import './BoardID.sass';

const BoardId = () => {
  return (
    <div className="Board__container">
      <div className="Board__wrapper">
        <div className="Board__prev">
          <span>Назад</span>
          <span>/Доска1</span>
        </div>
        <div className="Board__tasks-container">
          <BoardTasks />
        </div>
      </div>
    </div>
  );
};
export default BoardId;
