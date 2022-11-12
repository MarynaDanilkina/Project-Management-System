import { ITaskProps, useAppDispatch } from 'interface/interface';
import React from 'react';
import { reduserSlice } from 'toolkitRedux/toolkitReducer';
import './task.sass';

const Task = ({ task, board }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const { boardsRedux } = reduserSlice.actions;

  return (
    <div className="Board__column-items" draggable={true}>
      <div className="Board__column-item">{task.title}</div>
    </div>
  );
};
export default Task;
