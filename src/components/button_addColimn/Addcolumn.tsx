import { fetchCreateColumn } from 'api/columnsApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import ModalAddColumn from '../addColumnDialogWindow';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';

const Addcolumn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
  const [modal, setModal] = useState(false);
  const ref = useRef<HTMLInputElement>(null!);

  function AddColumns() {
    dispatch(fetchCreateColumn({ title: ref.current.value, token, boardId: boards.id }));
    setModal(false);
  }

  return (
    <div className="Board__Addcolumn">
      <div className="add__column" onClick={() => setModal(true)}>
        <p>+ {t('add_column')}</p>
      </div>
      <ModalAddColumn
        onClose={() => setModal(false)}
        onOk={() => AddColumns()}
        onFocus={() => {}}
        isModalOpen={modal}
        titleError={true}
        ref={ref}
      />
    </div>
  );
};

export default Addcolumn;
