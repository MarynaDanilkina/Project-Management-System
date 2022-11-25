import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type DialogWindowProps = {
  onClose: () => void;
  onOk: () => void;
  title?: string;
  isModalOpen: boolean;
};

type FormControlProps = { children?: React.ReactElement };

export default function CustomFormControl({
  title,
  isModalOpen,
  onClose,
  onOk,
  children,
}: DialogWindowProps & FormControlProps) {
  const { t } = useTranslation();

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
              {t('cancel')}
            </Button>
            <Button
              sx={{
                width: '200px',
              }}
              variant="outlined"
              color="success"
              onClick={onOk}
            >
              {t('ok')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
