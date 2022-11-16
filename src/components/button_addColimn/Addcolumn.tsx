import { fetchCreateColumn } from 'api/columnsApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React from 'react';
const title = 'Новый столбец';
const Addcolumn = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const { boards } = useAppSelector((state) => state.boards);

  function AddColumns(boardId: string) {
    if (token) {
      dispatch(fetchCreateColumn({ title, token, boardId }));
    }
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
