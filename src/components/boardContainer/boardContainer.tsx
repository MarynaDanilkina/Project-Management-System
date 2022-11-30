import { Column } from 'api/contracts';
import Columns from 'components/colomns/Columns';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useState } from 'react';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { reduserSlice } from 'toolkitRedux/BoardsReducer';
import Addcolumn from '../button_addColimn/Addcolumn';
interface Iresult {
  x: Ix[];
}
type Ix = {
  id: string;
  title: string;
};
const reorder = (list: Column, startIndex: number, endIndex: number) => {
  const result = Array.from(list.tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const move = (
  source: Column,
  destination: Column,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source.tasks);
  const destClone = Array.from(destination.tasks);
  console.log('sourceClone:', sourceClone);
  console.log('destClone:', destClone);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {} as Iresult[];
  result[+droppableSource.droppableId].x = sourceClone;
  result[+droppableDestination.droppableId].x = destClone;
  console.log(result);
  return result;
};
const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const { addDnd, addDnd2 } = reduserSlice.actions;
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
      dispatch(addDnd({ items, sInd }));
    } else {
      const items = move(boards.columns[sInd], boards.columns[dInd], source, destination);
      dispatch(addDnd2({ items, sInd, dInd }));
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
