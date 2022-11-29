import { fetchAllBoards } from 'api/boardsApi';
import Board from 'components/board/board';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectToken } from 'toolkitRedux/userSlice/userSlice';

const Boards = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    token && dispatch(fetchAllBoards(token));
  }, [dispatch, token]);

  const { AllBoards } = useAppSelector((state) => state.boards);

  return (
    <div className="allBoard__container">
      {AllBoards.map((board) => (
        <Link key={board.id} to={`/board/${board.id}`}>
          <Board board={board} key={board.id} />
        </Link>
      ))}
    </div>
  );
};
export default Boards;
