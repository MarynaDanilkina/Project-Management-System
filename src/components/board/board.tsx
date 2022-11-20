import { fetchDeleteBoard, fetchUpdateBoard } from 'api/boardsApi';
import { IBoards, useAppDispatch, useAppSelector } from 'interface/interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export type IBoardsProps = {
  board: IBoards;
};
const title = 'Название изменено2';
const description = 'Описание изменено';
const Board = ({ board }: IBoardsProps) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  function deleteBoards(id: string) {
    if (token) {
      dispatch(fetchDeleteBoard({ token, id }));
    }
  }
  function updateBoards(title: string, description: string, token: string, id: string) {
    dispatch(fetchUpdateBoard({ title, description, token, id }));
  }

  return (
    <div className="allBoard__bord">
      <h3>{board.title}</h3>
      <p>{board.description}</p>
      <div className="allBoard__button-change">
        <svg
          className="allBoard__svg"
          onClick={() => updateBoards(title, description, token!, board.id)}
        >
          <use xlinkHref="#bord-change"></use>
        </svg>
        <svg className="allBoard__svg" onClick={() => deleteBoards(board.id)}>
          <use xlinkHref="#bord-delete"></use>
        </svg>
      </div>
    </div>
  );
};
export default Board;
