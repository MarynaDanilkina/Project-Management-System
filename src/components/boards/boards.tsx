import { fetchgetAllBoards } from 'api/boardsApi';
import Board from 'components/board/board';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Boards = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchgetAllBoards(token));
    }
  }, []);

  const { Allboards } = useAppSelector((state) => state.boards);

  return (
    <div className="allBoard__container">
      {Allboards.map((board) => (
        <Link key={board.id} to={`/board/${board.id}`}>
          <Board board={board} key={board.id} />
        </Link>
      ))}
    </div>
  );
};
export default Boards;
