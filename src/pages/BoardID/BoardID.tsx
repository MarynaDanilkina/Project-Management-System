import { fetchGetBoardById } from 'api/boardsApi';
import BoardContainer from 'components/boardContainer/boardContainer';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BoardID.sass';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';

const BoardId = () => {
  const { id } = useParams();
  const { boards } = useAppSelector((state) => state.boards);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchGetBoardById({ token, id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log(boards);
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
