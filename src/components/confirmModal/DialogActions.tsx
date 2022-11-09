import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

type DialogActionsProps = { onCancel: () => void; onOk: () => void };

const DialogActionsComponent = ({ onCancel, onOk }: DialogActionsProps) => {
  return (
    <DialogActions
      sx={{
        flexDirection: 'column',
      }}
    >
      <Button
        sx={{ width: '200px', mb: '10px', ml: '8px' }}
        variant="contained"
        color="error"
        onClick={onCancel}
      >
        Disagree
      </Button>
      <Button
        sx={{
          width: '200px',
        }}
        variant="contained"
        color="success"
        onClick={onOk}
      >
        Agree
      </Button>
    </DialogActions>
  );
};

export default DialogActionsComponent;
