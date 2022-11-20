import { Column } from 'api/contracts';
import { fetchCreateTask } from 'api/tasksApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import React from 'react';
const title = '6';
const description = 'описание задачи';
const userId = 'dd398f23-1324-4e5c-95f7-0dd193b5e89f';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';
export type IBoardProps = {
  board: Column;
};
const AddTask = ({ board }: IBoardProps) => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
  const boardId = boards.id;
  const columnId = board.id;
  function addTask() {
    dispatch(fetchCreateTask({ title, description, userId, token, boardId, columnId }));
  }
  return (
    <div className="add__column-tasks" onClick={() => addTask()}>
      <p>+ Добавить задачу</p>
    </div>
  );
};
export default AddTask;
