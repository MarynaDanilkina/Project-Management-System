import { Column } from 'api/contracts';
import AddTask from 'components/button_addTask/addTask';
import TaskCompon from 'components/task/task';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
export type IBoardProps = {
  board: Column;
};
const Colomn = ({ board }: IBoardProps) => {
  return (
    <Droppable droppableId={board.id}>
      {(provided, snapshot) => (
        <div className="Board__column" ref={provided.innerRef} {...provided.droppableProps}>
          <h3>{board.title}</h3>
          {board.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCompon task={task} key={task.id} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <AddTask board={board} />
        </div>
      )}
    </Droppable>
  );
};
export default Colomn;
