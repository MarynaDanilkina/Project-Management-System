import { IBoards } from 'interface/interface';
import React from 'react';
export type IBoardsProps = {
  board: IBoards;
};
const Board = ({ board }: IBoardsProps) => {
  return (
    <div className="allBoard__bord">
      <h3>{board.title}</h3>
      <p>{board.description}</p>
      <div className="allBoard__button-change">
        <svg className="allBoard__svg">
          <use xlinkHref="#bord-change"></use>
        </svg>
        <svg className="allBoard__svg">
          <use xlinkHref="#bord-delete"></use>
        </svg>
      </div>
    </div>
  );
};
export default Board;
