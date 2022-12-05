import { Column, IBoardDetailed } from 'api/contracts';
import Columns from 'components/colomns/Columns';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React from 'react';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { reduserSlice } from 'toolkitRedux/BoardsReducer';
import Addcolumn from '../button_addColimn/Addcolumn';
export interface ITask {
  id: string;
  title: string;
}
const reorderTask = (list: Column, startIndex: number, endIndex: number) => {
  const result = Array.from(list.tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const moveTask = (
  source: Column,
  destination: Column,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source.tasks);
  const destClone = Array.from(destination.tasks);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {} as ITask[][];
  result[+droppableSource.droppableId] = sourceClone;
  result[+droppableDestination.droppableId] = destClone;
  return result;
};
const reorderColumn = (list: IBoardDetailed, startIndex: number, endIndex: number) => {
  const result = Array.from(list.columns);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const { addDnd, addDnd2, addDndcolumn } = reduserSlice.actions;
  const { boards } = useAppSelector((state) => state.boards);
  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (result.type === 'task') {
      if (sInd === dInd) {
        const items = reorderTask(boards.columns[sInd], source.index, destination.index);
        dispatch(addDnd({ items, sInd }));
      } else {
        const items = moveTask(boards.columns[sInd], boards.columns[dInd], source, destination);
        dispatch(addDnd2({ items, sInd, dInd }));
      }
    }
    if (result.type === 'column') {
      const items = reorderColumn(boards, source.index, destination.index);
      dispatch(addDndcolumn({ items }));
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
