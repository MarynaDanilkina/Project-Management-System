import Tasks from 'components/tasks/tasks';
import { IBoards } from 'interface/interface';
import React, { useState } from 'react';
export type IBoardsProps = {
  board: IBoards;
};
const BoardTasks = () => {
  const [boards, setBoards] = useState([
    {
      id: '1',
      title: 'Доска1',
      order: 1,
      tasks: [
        {
          id: '11',
          title: 'Задача11',
          order: 1,
          done: false,
          description: 'Описание доски 1 задача 1',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '12',
          title: 'Задача12',
          order: 12,
          done: false,
          description: 'Описание доски 1 задача 2',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f822222',
          files: [
            {
              filename: 'foto2222.jpg',
              fileSize: 6105000,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Доска 2',
      order: 12,
      tasks: [
        {
          id: '21',
          title: 'Задача21',
          order: 1,
          done: false,
          description: 'Описание доски 2 задача 1',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f85555',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '22',
          title: 'Задача22',
          order: 12,
          done: false,
          description: 'Описание доски 2 задача 2',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f86666666',
          files: [
            {
              filename: 'foto2222.jpg',
              fileSize: 6105000,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="Board__tasks">
      {boards.map((board) => (
        <Tasks board={board} key={board.id} />
      ))}
    </div>
  );
};
export default BoardTasks;
