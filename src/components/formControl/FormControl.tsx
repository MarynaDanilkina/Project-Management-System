import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export type ModalWindowProps = {
  onClose: () => void;
  onOk: () => void;
  title?: string;
  isModalOpen: boolean;
};

type FormControlProps = { children?: React.ReactElement };

export default function FormDialog({
  title,
  isModalOpen,
  onClose,
  onOk,
  children,
}: ModalWindowProps & FormControlProps) {
  return (
    <>
      <Dialog open={isModalOpen} onClose={onClose}>
        <Box sx={{ width: '400px', justifyContent: 'center', py: '1rem' }}>
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            {title}
          </DialogTitle>
          {children && children}
          <DialogActions
            sx={{
              flexDirection: 'column',
            }}
          >
            <Button
              sx={{ width: '200px', mb: '10px', ml: '8px' }}
              variant="outlined"
              color="error"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: '200px',
              }}
              variant="outlined"
              color="success"
              onClick={onOk}
            >
              Okey
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
