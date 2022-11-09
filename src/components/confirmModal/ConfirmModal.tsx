import { Button, DialogActions } from '@mui/material';
import React from 'react';
import ModalWindow from '../modalWindow';
import DialogActionsComponent from './DialogActions';

const ConfirmModal = () => {
  const [open, setOpen] = React.useState(false);
  const title = 'Are you sure?';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ModalWindow
      title={title}
      isModalWindowOpen={open}
      onClose={handleClose}
      onClickOpen={handleClickOpen}
      DialogActions={<DialogActionsComponent onCancel={handleClose} onOk={handleClose} />}
    />
  );
};

export default ConfirmModal;
