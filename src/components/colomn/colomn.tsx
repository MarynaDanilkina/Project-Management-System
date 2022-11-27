import { Column } from 'api/contracts';
import AddTask from 'components/button_addTask/addTask';
import TaskCompon from 'components/task/task';
import React from 'react';

const Colomn = ({ board }: { board: Column }) => {
  return (
    <div className="Board__column">
      <h3>{board.title}</h3>
      <div>
        {board.tasks.map((task) => (
          <TaskCompon task={task} key={task.id} />
        ))}
      </div>
      <AddTask board={board} />
    </div>
  );
};

export default Colomn;
