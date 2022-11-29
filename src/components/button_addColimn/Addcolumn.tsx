import { fetchCreateColumn } from 'api/columnsApi';
import { useAppDispatch, useAppSelector } from 'interface/interface';
import ModalAddColumn from '../addColumnDialogWindow';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { selectToken } from 'toolkitRedux/userSlice/userSlice';

const Addcolumn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const { boards } = useAppSelector((state) => state.boards);
  const [modal, setModal] = useState(false);
  const ref = useRef<HTMLInputElement>(null!);

  function AddColumns() {
    token && dispatch(fetchCreateColumn({ title: ref.current.value, token, boardId: boards.id }));
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
