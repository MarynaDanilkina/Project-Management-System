import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

type ModalWindowProps = {
  DialogActions: React.ReactElement;
  title: string;
  isModalWindowOpen: boolean;
  onClose: () => void;
  onClickOpen: () => void;
};
export default function ModalWindow({
  DialogActions,
  title,
  isModalWindowOpen,
  onClickOpen,
  onClose,
}: ModalWindowProps) {
  return (
    <div>
      <Button variant="outlined" onClick={onClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={isModalWindowOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: '300px', justifyContent: 'center', py: '1rem' }}>
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            {title}
          </DialogTitle>
          {DialogActions}
        </Box>
      </Dialog>
    </div>
  );
}
