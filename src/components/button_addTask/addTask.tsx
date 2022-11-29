import { Column } from 'api/contracts';
import { fetchCreateTask } from 'api/tasksApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import Modal from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectToken, selectUser } from 'toolkitRedux/userSlice/userSlice';
import { isInputRefValueEmpty } from '../../pages/AllBoard/AllBoard';

const AddTask = ({ board }: { board: Column }) => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  const [fetchErrorMsg, setFetchErrMsg] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [modal, setModal] = useState(false);
  const inputRefTitle = useRef<HTMLInputElement>(null!);
  const inputRefDescription = useRef<HTMLInputElement>(null!);

  const getRefs = () => ({ inputRefTitle, inputRefDescription });

  function addTask() {
    isInputRefValueEmpty(inputRefTitle) ? setTitleError(true) : setTitleError(false);
    isInputRefValueEmpty(inputRefDescription)
      ? setDescriptionError(true)
      : setDescriptionError(false);
    if (!isInputRefValueEmpty(inputRefTitle) && !isInputRefValueEmpty(inputRefDescription)) {
      token &&
        user &&
        dispatch(
          fetchCreateTask({
            title: inputRefTitle.current.value,
            description: inputRefDescription.current.value,
            userId: user.userId,
            token,
            boardId: boards.id,
            columnId: board.id,
          })
        )
          .unwrap()
          .then(() => {
            if (fetchErrorMsg) {
              setFetchErrMsg('');
              setModal(false);
            }
          })
          .catch((err) => setFetchErrMsg(err.message));
      setModal(false);
    }
  }

  const resetErrors = () => {
    setTitleError(false);
    setDescriptionError(false);
  };
  const onDescriptionInputFocus = () => {
    setDescriptionError(false);
  };
  const onTitleInputFocus = () => {
    setTitleError(false);
  };

  const onClose = () => {
    resetErrors();
    setModal(false);
  };

  return (
    <>
      <div className="add__column-tasks" onClick={() => setModal(true)}>
        <p>+ {t('add_task')}</p>
      </div>
      <Modal
        fetchErrorMsg={fetchErrorMsg}
        inputDefaultTitleValue={'title'}
        inputDefaultDescriptionValue={'descr'}
        titleError={titleError}
        descriptionError={descriptionError}
        onTitleFocus={onTitleInputFocus}
        onDescriptionFocus={onDescriptionInputFocus}
        getRefs={getRefs}
        onOk={addTask}
        onClose={onClose}
        isModalOpen={modal}
      />
    </>
  );
};

export default AddTask;
