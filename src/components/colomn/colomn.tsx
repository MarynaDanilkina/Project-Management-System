import { Column } from 'api/contracts';
import AddTask from 'components/button_addTask/addTask';
import TaskCompon from 'components/task/task';
import React, { LegacyRef } from 'react';
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
export type IBoardProps = {
  board: Column;
  index: number;
  ColomnRef: LegacyRef<HTMLDivElement> | undefined;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps;
};
const Colomn = ({ board, index, ColomnRef, draggableProps, dragHandleProps }: IBoardProps) => {
  return (
    <div ref={ColomnRef} {...draggableProps} {...dragHandleProps}>
      <Droppable droppableId={'' + index} key={index} type="task">
        {(providedTasks) => (
          <div
            className="Board__column"
            ref={providedTasks.innerRef}
            {...providedTasks.droppableProps}
          >
            <h3>{board.title}</h3>
            <div className="task-Column__container">
              {board.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(providedTask) => (
                    <div
                      ref={providedTask.innerRef}
                      {...providedTask.draggableProps}
                      {...providedTask.dragHandleProps}
                    >
                      <TaskCompon task={task} key={task.id} />
                    </div>
                  )}
                </Draggable>
              ))}
              {providedTasks.placeholder}
            </div>
            <AddTask board={board} />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Colomn;
