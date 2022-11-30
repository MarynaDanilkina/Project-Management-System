import { fetchCreateBoard } from 'api/boardsApi';
import BackdropComponent from 'components/backdrop';
import Boards from 'components/boards/boards';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import './AllBoard.sass';

const AllBoard = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  function addBoard() {
    const title = 'Новая доска создана';
    const description = 'Описание новой доски';
    if (token) {
      dispatch(fetchCreateBoard({ title, description, token }));
    }
  }

  return (
    <div className="allBoard__container">
      <div className="allBoard__wrapper">
        <div className="allBoard__link">
          <h2>Ваши доски</h2>
          <button className="allBoard__button-add" onClick={() => addBoard()}>
            + Создать
          </button>
        </div>
        <div className="allBoards__container">
          <Boards />
        </div>
      </div>
    </div>
  );
};
export default AllBoard;
//<BackdropComponent open={true} />
