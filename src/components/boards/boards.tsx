import { fetchAllBoards } from 'api/boardsApi';
import Board from 'components/board/board';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Boards = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllBoards(token));
    }
  }, []);

  const { AllBoards } = useAppSelector((state) => state.boards);

  return (
    <div className="allBoard__container">
      {AllBoards.map((board) => (
        <Link key={board._id} to={`/board/${board._id}`}>
          <Board board={board} key={board._id} />
        </Link>
      ))}
    </div>
  );
};
export default Boards;
