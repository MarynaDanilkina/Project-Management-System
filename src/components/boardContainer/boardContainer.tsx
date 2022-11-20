import { Column } from 'api/contracts';
import Columns from 'components/colomns/Columns';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reduserSlice } from 'toolkitRedux/BoardsReducer';
import Addcolumn from '../button_addColimn/Addcolumn';

const reorder = (list: Column, startIndex: number, endIndex: number) => {
  //console.log('list:', list);
  //console.log('startIndex:', startIndex);
  //console.log('endIndex:', endIndex);
  const result = Array.from(list.tasks);
  //console.log('result', result);
  const [removed] = result.splice(startIndex, 1);
  //console.log('removed', removed);
  result.splice(endIndex, 0, removed);

  return result;
};

const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const { addDnd } = reduserSlice.actions;
  const { boards } = useAppSelector((state) => state.boards);
  const [state, setState] = useState(boards.columns);
  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      const items = reorder(boards.columns[sInd], source.index, destination.index);
      //console.log('items', items);
      //const newState = boards;
      //console.log(items);
      //newState.columns[sInd].tasks = items;
      dispatch(addDnd({ items, sInd }));
    }
  }
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
