import Columns from 'components/colomns/Columns';
import { useAppSelector } from 'interface/interface';
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Addcolumn from '../button_addColimn/Addcolumn';

const BoardContainer = () => {
  const { boards } = useAppSelector((state) => state.boards);
  function onDragEnd(result: DropResult) {}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="Board__tasks">
        {boards.columns && boards.columns.length !== 0 ? <Columns /> : null}
        <Addcolumn />
      </div>
    </DragDropContext>
  );
};
export default BoardContainer;
