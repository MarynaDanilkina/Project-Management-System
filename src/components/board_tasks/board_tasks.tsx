import Tasks from 'components/tasks/tasks';
import { IBoards, useAppSelector } from 'interface/interface';
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
export type IBoardsProps = {
  board: IBoards;
};
const BoardTasks = () => {
  function onDragEnd(result: DropResult) {}
  const { boards } = useAppSelector((state) => state);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="Board__tasks">
        {boards.map((board, ind) => (
          <Tasks board={board} key={board.id} />
        ))}
      </div>
    </DragDropContext>
  );
};
export default BoardTasks;
