import { fetchgetAllBoards } from 'api/boardsApi';
import Board from 'components/board/board';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';

const Boards = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchgetAllBoards(token));
  }, []);

  const { Allboards } = useAppSelector((state) => state);

  return (
    <div className="allBoard__container">
      {Allboards.map((board) => (
        //<Link key={board.id} to={`/board/${board.id}`}>
        <Board board={board} key={board.id} />
        //</Link>
      ))}
    </div>
  );
};
export default Boards;
