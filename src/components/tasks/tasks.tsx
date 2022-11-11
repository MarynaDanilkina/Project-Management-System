import Task from 'components/task/task';
import React from 'react';
export interface ITasks {
  id: string;
  title: string;
  order: number;
  tasks: {
    id: string;
    title: string;
    order: number;
    done: boolean;
    description: string;
    userId: string;
    files: {
      filename: string;
      fileSize: number;
    }[];
  }[];
}
[];
export type ITasksProps = {
  board: ITasks;
};

const Tasks = ({ board }: ITasksProps) => {
  return (
    <div className="Board__column">
      <h3>{board.title}</h3>
      {board.tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
      <div className="add__column-tasks">
        <p>+ Добавить задачу</p>
      </div>
    </div>
  );
};
export default Tasks;
