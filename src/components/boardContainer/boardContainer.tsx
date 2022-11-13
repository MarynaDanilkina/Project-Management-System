import Columns from 'components/colomns/Columns';
import { useAppSelector } from 'interface/interface';
import React from 'react';
import Addcolumn from '../button_addColimn/Addcolumn';

const BoardContainer = () => {
  const { boards } = useAppSelector((state) => state.boards);
  return (
    <div className="Board__tasks">
      {boards.columns && boards.columns.length !== 0 ? <Columns /> : null}
      <Addcolumn />
    </div>
  );
};
export default BoardContainer;
