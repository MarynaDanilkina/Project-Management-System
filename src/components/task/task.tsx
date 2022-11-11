import React from 'react';
export interface ITask {
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
}
[];
export type ITasksProps = {
  task: ITask;
};

const Task = ({ task }: ITasksProps) => {
  return (
    <div className="Board__column-items">
      <div className="Board__column-item">{task.title}</div>
    </div>
  );
};
export default Task;
