import { useAppSelector } from 'interface/interface';
import React from 'react';
import './Columns.sass';
import Column from '../colomn/colomn';

const Columns = () => {
  const { boards } = useAppSelector((state) => state.boards);

  return (
    <div className="Boards__container">
      {boards.columns.map((board) => (
        <Column board={board} key={board.id} />
      ))}
    </div>
  );
};

export default Columns;
