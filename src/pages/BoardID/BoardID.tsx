import { fetchGetBoardById } from 'api/boardsApi';
import BoardContainer from 'components/boardContainer/boardContainer';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BoardID.sass';

const BoardId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id && token) {
      dispatch(fetchGetBoardById({ token, id }));
    }
  }, []);
  const { boards } = useAppSelector((state) => state.boards);
  useEffect(() => {
    //console.log(boards);
  }, [boards]);
  return (
    <div className="Board__container">
      <div className="Board__wrapper">
        <div className="Board__prev">
          <span className="Board__prev-button" onClick={() => goBack()}>
            Назад
          </span>
          <span>/{boards.title}</span>
        </div>
        <div className="Board__tasks-container">
          <BoardContainer />
        </div>
      </div>
    </div>
  );
};
export default BoardId;
