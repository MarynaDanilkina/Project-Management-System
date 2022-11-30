import { fetchDeleteBoard, fetchUpdateBoard } from 'api/boardsApi';
import ModalForEditBoard from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import ModalForConfirm from '../confirmDialogWindow';
import { IBoards, useAppDispatch } from 'interface/interface';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isInputRefValueEmpty } from '../../pages/AllBoard/AllBoard';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';

const Board = ({ board }: { board: IBoards }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
    dispatch(fetchDeleteBoard({ token, id: board.id }));
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
      dispatch(
        fetchUpdateBoard({
          title: inputRefTitle.current.value,
          description: inputRefDescription.current.value,
          token,
          id: board.id,
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
      <p>{board.description}</p>
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
        inputDefaultDescriptionValue={board.description}
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
