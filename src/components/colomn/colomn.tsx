import { Column } from 'api/contracts';
import AddTask from 'components/button_addTask/addTask';
import TaskCompon from 'components/task/task';
import ConfirmDialogWindow from 'components/confirmDialogWindow';
import { useAppSelector } from 'interface/interface';
import { selectToken, selectUser } from 'toolkitRedux/userSlice/userSlice';
import { deleteColumn } from 'api/columnsApi';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Colomn = ({ board }: { board: Column }) => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const { boards } = useAppSelector((state) => state.boards);
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const onModalOk = () => {
    if (token && user?.userId) {
      deleteColumn(token, boards.id, board.id);
      toggleIsModalOpen(); //! Нужен перерендер
    }
  };

  // редактирование задачи
  // updateTask

  // редактирование столбца
  // updateColumn

  return (
    <div className="Board__column">
      <h3>{board.title}</h3>
      <div>
        {board.tasks.map((task) => (
          <TaskCompon task={task} board={board} key={task.id} />
        ))}
      </div>
      <AddTask board={board} />
      <div onClick={() => setIsModalOpen(true)}>
        <p>Будет урна</p>
      </div>
      <ConfirmDialogWindow
        title={`${t('delete_board_warning')} "${board.title}"?`}
        onOk={onModalOk}
        onClose={toggleIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default Colomn;
