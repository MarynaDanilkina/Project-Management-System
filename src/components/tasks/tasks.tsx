import Task from 'components/task/task';
import { ITasksProps } from 'interface/interface';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Tasks = ({ board }: ITasksProps) => {
  return (
    <Droppable droppableId={board.id}>
      {(provided, snapshot) => (
        <div className="Board__column" ref={provided.innerRef} {...provided.droppableProps}>
          <h3>{board.title}</h3>
          {board.tasks.map((task, index) => {
            return (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>
                      <Task task={task} board={board} key={task.id} />
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
          <div className="add__column-tasks">
            <p>+ Добавить задачу</p>
          </div>
        </div>
      )}
    </Droppable>
  );
};
export default Tasks;
