import { Column } from 'api/contracts';
import { fetchCreateTask } from 'api/tasksApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import Modal from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectToken } from 'toolkitRedux/userSlice/userSlice';

const userId = 'dd398f23-1324-4e5c-95f7-0dd193b5e89f';

const AddTask = ({ board }: { board: Column }) => {
  const token = useAppSelector(selectToken);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  const [modal, setModal] = useState(false);
  const inputRefTitle = useRef<HTMLInputElement>(null!);
  const inputRefDescription = useRef<HTMLSelectElement>(null!);
  const getRefs = () => ({ inputRefTitle, inputRefDescription });

  function addTask() {
    token &&
      dispatch(
        fetchCreateTask({
          title: inputRefTitle.current.value,
          description: inputRefDescription.current.value,
          userId,
          token,
          boardId: boards.id,
          columnId: board.id,
        })
      );
    setModal(false);
  }

  return (
    <>
      <div className="add__column-tasks" onClick={() => setModal(true)}>
        <p>+ {t('add_task')}</p>
      </div>
      <Modal
        titleError={true}
        titleLabel={t('title')}
        descriptionLabel={t('description')}
        titleInputID="1"
        descriptionInputID="2"
        onFocus={() => {}}
        getRefs={getRefs}
        onOk={() => addTask()}
        onClose={() => setModal(false)}
        isModalOpen={modal}
      />
    </>
  );
};

export default AddTask;
