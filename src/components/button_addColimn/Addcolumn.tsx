import { fetchCreateColumn } from 'api/columnsApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React from 'react';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';
const title = 'Новый столбец';
const Addcolumn = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  function AddColumns(boardId: string) {
    dispatch(fetchCreateColumn({ title, token, boardId }));
  }
  return (
    <div className="Board__Addcolumn">
      <div className="add__column" onClick={() => AddColumns(boards.id)}>
        <p>+ Добавить колонку</p>
      </div>
    </div>
  );
};
export default Addcolumn;
