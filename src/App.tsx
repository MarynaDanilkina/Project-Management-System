import React, { useEffect, useRef, useState } from 'react';
import ConfirmDialogWindow from 'components/confirmDialogWindow';
import AddColumnModal from 'components/addColumnModal';
import EditBoardOrAddBoardOrAddTaskModal from 'components/editBoardOrAddBoardOrAddTaskModal';
import EditTaskModal from 'components/editTaskModal/EditTaskModal';

function App() {
  const titleRef = useRef<HTMLInputElement>(null!);
  const selectRef = useRef<HTMLSelectElement>(null!);
  const [titleError, setTitleError] = useState(false);

  const onOk = () => {
    console.log(titleRef.current?.value);
    console.log(selectRef.current?.value);
    titleRef.current?.value === '' && setTitleError(true);
  };

  return (
    /*
    <EditTaskModal
      title="Edit task"
      titleRef={titleRef}
      selectRef={selectRef}
      defaultValue="some"
      selectedValue="Zidan"
      selectValues={['Zidan', 'Messi', 'Rooney']}
      isModalOpen={true}
      titleError={titleError}
      onClose={() => {}}
      onOk={onOk}
    />
    */
    /*
    <EditBoardOrAddBoardOrAddTaskModal
      title="Add Task"
      titleError={false}
      descriptionError={false}
      titleInputID="task-title-input"
      descreptionInputID="task-descreption-input"
      titleLabel="Title of the task"
      descreptionLabel="Descreption of the task"
      isModalOpen={true}
      onClose={() => {}}
      onOk={() => {}}
    />
    */
    /*<EditBoardOrAddBoardOrAddTaskModal
      title="Add Board"
      titleError={false}
      descriptionError={false}
      titleInputID="board-title-input"
      descreptionInputID="board-descreption-input"
      titleLabel="Title of the board"
      descreptionLabel="Descreption of the board"
      isModalOpen={true}
      onClose={() => {}}
      onOk={() => {}}
    />*/
    // <AddColumnModal titleError={false} isModalOpen={true} onClose={() => {}} onOk={() => {}} />
    // <ConfirmDialogWindow title="Add Board" isModalOpen={true} onClose={() => {}} onOk={() => {}} />
  );
}

export default App;
