import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import FormControl, { ModalWindowProps } from 'components/formControl/FormControl';

type FormDialogProps = {
  titleError: boolean;
  titleLabel: string;
  descreptionLabel: string;
  titleInputID: string;
  descreptionInputID: string;
  onFocus: () => void;
};

export default function FormDialog({
  onClose,
  onOk,
  isModalOpen,
  title,
  titleLabel,
  descreptionLabel,
  titleInputID,
  descreptionInputID,
  titleError,
  onFocus,
}: ModalWindowProps & FormDialogProps) {
  return (
    <>
      <FormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id={titleInputID}
            label={titleLabel}
            type="text"
            fullWidth
            variant="outlined"
            error={titleError}
            onFocus={onFocus}
          />
          <TextField
            margin="dense"
            id={descreptionInputID}
            label={descreptionLabel}
            type="text"
            fullWidth
            variant="outlined"
            multiline={true}
            rows={5}
          />
        </DialogContent>
      </FormControl>
    </>
  );
}
