import { IBoardDetailed } from 'api/contracts';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React from 'react';
import './Columns.sass';
import Colomn from '../colomn/colomn';
export type IBoardProps = {
  board: IBoardDetailed;
};
const Columns = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  return (
    <div className="Boards__container">
      {boards.columns.map((board) => (
        <Colomn board={board} key={board.id} />
      ))}
    </div>
  );
};
export default Columns;
