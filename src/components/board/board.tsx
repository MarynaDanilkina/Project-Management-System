import { fetchDeleteBoard, fetchUpdateBoard, IBoard } from 'api/boardsApi';
import ModalForEditBoard from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import ModalForConfirm from '../confirmDialogWindow';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isInputRefValueEmpty } from '../../pages/AllBoard/AllBoard';
import { selectToken, selectUser, selectUsers } from '../../toolkitRedux/userSlice/userSlice';

const Board = ({ board }: { board: IBoard }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const usersIDs = users?.map((user) => user._id);

  const isArgs = () => {
    return !!(token && usersIDs && users && user);
  };

  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [fetchErrorMsg, setFetchErrMsg] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const inputRefTitle = useRef<HTMLInputElement>(null!);
  const inputRefDescription = useRef<HTMLInputElement>(null!);

  const getRefs = () => ({ inputRefTitle, inputRefDescription });
  const modalConfirmTitle = `${t('delete_board_warning')} "${board.title}"?`;

  const openCloseConfirmModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalConfirm(true);
  };

  const openCloseEditModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalEdit(true);
    setTitleError(false);
  };

  const deleteBoard = () => {
    setModalConfirm(false);
    token && dispatch(fetchDeleteBoard({ token, id: board._id }));
  };

  const onModalEditClose = () => {
    setTitleError(false);
    setModalEdit(false);
  };

  const updateBoard = () => {
    isInputRefValueEmpty(inputRefTitle) ? setTitleError(true) : setTitleError(false);
    isInputRefValueEmpty(inputRefDescription)
      ? setDescriptionError(true)
      : setDescriptionError(false);
    if (!isInputRefValueEmpty(inputRefTitle) && !isInputRefValueEmpty(inputRefDescription)) {
      isArgs() &&
        dispatch(
          fetchUpdateBoard({
            title: inputRefTitle.current.value,
            users: usersIDs as string[],
            token: token as string,
            _id: board._id,
            owner: user?.userId as string,
          })
        )
          .unwrap()
          .then(() => {
            if (fetchErrorMsg) {
              setFetchErrMsg('');
            }
            setModalEdit(false);
          })
          .catch((err) => setFetchErrMsg(err.message));
    }
  };
  const onDescriptionInputFocus = () => {
    setDescriptionError(false);
  };
  const onTitleInputFocus = () => {
    setTitleError(false);
  };
  return (
    <div className="allBoard__board">
      <h3>{board.title}</h3>
      <p>{user?.name}</p>
      <div className="allBoard__button-change">
        <svg className="allBoard__svg" onClick={(e) => openCloseEditModal(e)}>
          <use xlinkHref="#board-change"></use>
        </svg>
        <svg className="allBoard__svg" onClick={(e) => openCloseConfirmModal(e)}>
          <use xlinkHref="#board-delete"></use>
        </svg>
      </div>
      <ModalForConfirm
        onClose={() => setModalConfirm(false)}
        onOk={() => deleteBoard()}
        isModalOpen={modalConfirm}
        title={modalConfirmTitle}
      />
      <ModalForEditBoard
        fetchErrorMsg={fetchErrorMsg}
        titleError={titleError}
        descriptionError={descriptionError}
        inputDefaultTitleValue={board.title}
        inputDefaultDescriptionValue={board.owner}
        onTitleFocus={onTitleInputFocus}
        onDescriptionFocus={onDescriptionInputFocus}
        getRefs={getRefs}
        onOk={updateBoard}
        onClose={onModalEditClose}
        isModalOpen={modalEdit}
      />
    </div>
  );
};
export default Board;
