import { fetchGetBoardById } from 'api/boardsApi';
import BoardContainer from 'components/boardContainer/boardContainer';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { selectToken } from 'toolkitRedux/userSlice/userSlice';
import './BoardID.sass';

const BoardId = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { boards } = useAppSelector((state) => state.boards);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (id) {
      token && dispatch(fetchGetBoardById({ token, id }));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  return (
    <div className="Board__container">
      <div className="Board__wrapper">
        <div className="Board__prev">
          <span className="Board__prev-button" onClick={() => goBack()}>
            {t('go_back')}
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
