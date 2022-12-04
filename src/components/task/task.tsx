import { Task } from 'api/contracts';
import { Column } from 'api/contracts';
import React, { useState, useRef } from 'react';
import ConfirmDialogWindow from 'components/confirmDialogWindow';
import { useAppSelector } from 'interface/interface';
import { selectToken, selectUser } from 'toolkitRedux/userSlice/userSlice';
import ModalForEditTask from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import { deleteTask, updateTask } from 'api/tasksApi';
import { useTranslation } from 'react-i18next';

export interface ITask {
  task: Task;
  board: Column;
}

const TaskCompon = ({ task, board }: ITask) => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const { boards } = useAppSelector((state) => state.boards);
  const { t } = useTranslation();

  const inputRefTitle = useRef<HTMLInputElement>(null!);
  const inputRefDescription = useRef<HTMLSelectElement>(null!);
  const getRefs = () => ({ inputRefTitle, inputRefDescription });

  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const toggleDeleteModalOpen = () => setDeleteModalActive(!deleteModalActive);
  const toggleUpdateModalOpen = () => setUpdateModalActive(!updateModalActive);

  const onDeleteModalOk = () => {
    if (token && user?.userId) {
      deleteTask(token, boards.id, board.id, task.id);
      toggleDeleteModalOpen(); //! Нужен перерендер
    }
  };

  const onUpdateModalOk = () => {
    if (token && user?.userId) {
      updateTask(
        inputRefTitle.current.value,
        task.order,
        inputRefDescription.current.value,
        token,
        boards.id,
        board.id,
        task.id,
        user.userId
      );
      toggleUpdateModalOpen(); //! Нужен перерендер
    }
  };

  return (
    <div className="Board__column-items" draggable={true}>
      <div className="Board__column-item">
        {task.title}
        <div onClick={() => setDeleteModalActive(true)}>
          <p>Урна для задачи</p>
        </div>
        <div onClick={() => setUpdateModalActive(true)}>
          <p>Значок редактирования</p>
        </div>
      </div>
      <ConfirmDialogWindow
        title={`${t('delete_task_warning')} "${task.title}"?`}
        onOk={onDeleteModalOk}
        onClose={toggleDeleteModalOpen}
        isModalOpen={deleteModalActive}
      />
      <ModalForEditTask
        titleError={true}
        titleLabel={t('title')}
        descriptionLabel={t('description')}
        titleInputID="1"
        descriptionInputID="2"
        onFocus={() => {}}
        getRefs={getRefs}
        onOk={() => onUpdateModalOk()}
        onClose={() => setUpdateModalActive(false)}
        isModalOpen={updateModalActive}
      />
    </div>
  );
};

export default TaskCompon;
