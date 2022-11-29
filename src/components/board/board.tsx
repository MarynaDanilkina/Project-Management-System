import { fetchDeleteBoard, fetchUpdateBoard } from 'api/boardsApi';
import ModalForEditBoard from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import ModalForConfirm from '../confirmDialogWindow';
import { IBoards, useAppDispatch, useAppSelector } from 'interface/interface';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { selectToken } from 'toolkitRedux/userSlice/userSlice';

const Board = ({ board }: { board: IBoards }) => {
  const token = useAppSelector(selectToken);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const inputRefTitle = useRef<HTMLInputElement>(null!);
  const inputRefDescription = useRef<HTMLSelectElement>(null!);

  const getRefs = () => ({ inputRefTitle, inputRefDescription });
  const modalConfirmTitle = `${t('delete_board_warning')} "${board.title}"?`;

  const openCloseConfirmModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalConfirm(true);
  };

  const openCloseEditModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalEdit(true);
  };

  const deleteBoard = () => {
    setModalConfirm(false);
    token && dispatch(fetchDeleteBoard({ token, id: board.id }));
  };

  const updateBoard = () => {
    setModalEdit(false);
    token &&
      dispatch(
        fetchUpdateBoard({
          title: inputRefTitle.current.value,
          description: inputRefDescription.current.value,
          token,
          id: board.id,
        })
      );
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
        titleError={true}
        titleLabel={t('title')}
        descriptionLabel={t('description')}
        titleInputID="1"
        descriptionInputID="2"
        onFocus={() => {}}
        getRefs={getRefs}
        onOk={() => updateBoard()}
        onClose={() => setModalEdit(false)}
        isModalOpen={modalEdit}
      />
    </div>
  );
};
export default Board;
