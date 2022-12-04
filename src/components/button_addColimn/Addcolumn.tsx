import { fetchCreateColumn } from 'api/columnsApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import ModalAddColumn from '../addColumnDialogWindow';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjQ4ODM3OS1hMDhjLTQ3YjMtOWNkNi01NjU5Y2JiNzg2NTYiLCJsb2dpbiI6InVzZXIwMDEyMiIsImlhdCI6MTY2ODE2NjcyN30.8ywrrjkBcaLGETqLwbAqwBojiGkbS2PnIS9QtotEUO8';

export const checkRefValueForBeingEpmty = (ref: React.RefObject<HTMLInputElement>) =>
  ref.current?.value === '';
const Addcolumn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const { boards } = useAppSelector((state) => state.boards);
  const [modal, setModal] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const ref = useRef<HTMLInputElement>(null!);

  function AddColumns() {
    if (checkRefValueForBeingEpmty(ref)) {
      setTitleError(true);
    } else {
      setModal(false);
      setTitleError(false);
      token &&
        dispatch(
          fetchCreateColumn({
            title: ref.current.value,
            token,
            boardId: boards.id,
            order: 1,
          })
        );
    }
  }

  const onModalClose = () => {
    setModal(false);
    setTitleError(false);
  };

  return (
    <div className="Board__Addcolumn">
      <div className="add__column" onClick={() => setModal(true)}>
        <p>+ {t('add_column')}</p>
      </div>
      <ModalAddColumn
        onClose={onModalClose}
        onOk={() => AddColumns()}
        onFocus={() => setTitleError(false)}
        isModalOpen={modal}
        titleError={titleError}
        ref={ref}
      />
    </div>
  );
};

export default Addcolumn;
