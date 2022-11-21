import { fetchDeleteBoard, fetchgetAllBoards, fetchUpdateBoard } from 'api/boardsApi';
import { IBoards, useAppDispatch } from 'interface/interface';
import React from 'react';
export type IBoardsProps = {
  board: IBoards;
};
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';
const title = 'Название изменено';
const description = 'Описание изменено';
const Board = ({ board }: IBoardsProps) => {
  const dispatch = useAppDispatch();

  function deleteBoards(id: string) {
    dispatch(fetchDeleteBoard({ token, id }));
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
          onClick={() => updateBoards(title, description, token, board.id)}
        >
          <use xlinkHref="#board-change"></use>
        </svg>
        <svg className="allBoard__svg" onClick={() => deleteBoards(board.id)}>
          <use xlinkHref="#board-delete"></use>
        </svg>
      </div>
    </div>
  );
};
export default Board;
