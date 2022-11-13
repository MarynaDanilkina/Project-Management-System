import { Task } from 'api/contracts';
import React from 'react';
export interface ITask {
  task: Task;
}
const TaskCompon = ({ task }: ITask) => {
  return (
    <div className="Board__column-items" draggable={true}>
      <div className="Board__column-item">{task.title}</div>
    </div>
  );
};
export default TaskCompon;
