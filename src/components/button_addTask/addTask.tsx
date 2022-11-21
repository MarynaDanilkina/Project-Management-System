import { Column } from 'api/contracts';
import { fetchCreateTask } from 'api/tasksApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import Modal from '../editBoardOrAddBoardOrAddTaskDialogWindow';
import React, { useRef, useState } from 'react';

const userId = 'dd398f23-1324-4e5c-95f7-0dd193b5e89f';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';

const AddTask = ({ board }: { board: Column }) => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  const [modal, setModal] = useState(false);
  const inputRefTitle = useRef<HTMLInputElement>(null!);
  const inputRefDescription = useRef<HTMLSelectElement>(null!);
  const getRefs = () => ({ inputRefTitle, inputRefDescription });

  function addTask() {
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
        <p>+ Добавить задачу</p>
      </div>
      <Modal
        titleError={true}
        titleLabel="Название: "
        descriptionLabel="Описание: "
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
