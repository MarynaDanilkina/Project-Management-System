import { fetchDeleteBoard, fetchUpdateBoard } from 'api/boardsApi';
import ModalForEditBoard from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import ModalForConfirm from '../confirmDialogWindow';
import { IBoards, useAppDispatch } from 'interface/interface';
import React, { useState } from 'react';
import { isInputRefValueEmpty } from '../../pages/AllBoard/AllBoard';
import useModalLogic from '../../hooks/useModalLogic/useModalLogic';

const Board = ({ board }: { board: IBoards }) => {
  const dispatch = useAppDispatch();
  const {
    token,
    t,
    values,
    updateFetchErrorMessage,
    closeModal,
    openModal,
    resetDescriptionInputError,
    resetTitleInputError,
    getRefs,
    checkRefs,
  } = useModalLogic();

  const [modalConfirm, setModalConfirm] = useState(false);
  const modalConfirmTitle = `${t('delete_board_warning')} "${board.title}"?`;

  const openCloseConfirmModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalConfirm(true);
  };

  const deleteBoard = () => {
    setModalConfirm(false);
    token && dispatch(fetchDeleteBoard({ token, id: board.id }));
  };

  const updateBoard = () => {
    checkRefs();
    if (
      !isInputRefValueEmpty(values.inputRefTitle) &&
      !isInputRefValueEmpty(values.inputRefDescription) &&
      token
    ) {
      if (
        values.inputRefTitle.current?.value === board.title &&
        values.inputRefDescription.current?.value === board.description
      ) {
        console.log('the same');
        closeModal();
        return;
      }
      dispatch(
        fetchUpdateBoard({
          title: values.inputRefTitle.current?.value ?? '',
          description: values.inputRefDescription.current?.value ?? '',
          token,
          id: board.id,
        })
      )
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((err) => updateFetchErrorMessage(err.message));
    }
  };
  return (
    <div className="allBoard__board">
      <h3>{board.title}</h3>
      <p>{board.description}</p>
      <div className="allBoard__button-change">
        <svg
          className="allBoard__svg"
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
        >
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
        fetchErrorMsg={values?.fetchErrorMsg}
        titleError={values?.titleError}
        descriptionError={values?.descriptionError}
        inputDefaultTitleValue={board.title}
        inputDefaultDescriptionValue={board.description}
        onTitleFocus={resetTitleInputError}
        onDescriptionFocus={resetDescriptionInputError}
        getRefs={getRefs}
        onOk={updateBoard}
        onClose={closeModal}
        isModalOpen={values.isModalOpen}
      />
    </div>
  );
};
export default Board;
