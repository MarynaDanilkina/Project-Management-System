import Board from 'components/board/board';
import React from 'react';
import { Link } from 'react-router-dom';
export interface IBoards {
  id: string;
  title: string;
  description: string;
}
const Boards = () => {
  const boards: IBoards[] = [
    {
      id: '11111',
      title: 'Homework tasks1111',
      description: 'My board tasks1111',
    },
    {
      id: '22222',
      title: 'Homework tasks2222',
      description: 'My board tasks2222',
    },
  ];
  return (
    <div className="allBoard__container">
      {boards.map((board) => (
        <Link key={board.id} to={`/board/${board.id}`}>
          <Board board={board} key={board.id} />
        </Link>
      ))}
    </div>
  );
};
export default Boards;
