import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import FormControl, { ModalWindowProps } from 'components/formControl/FormControl';

type AddColumnProps = { titleError: boolean };

export default function AddColumn({
  onClose,
  onOk,
  isModalOpen,
  titleError,
}: ModalWindowProps & AddColumnProps) {
  return (
    <>
      <FormControl title="Add column" onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
        <DialogContent>
          <TextField
            margin="dense"
            id="board-title"
            label="Title of the column"
            type="text"
            fullWidth
            variant="outlined"
            error={titleError}
          />
        </DialogContent>
      </FormControl>
    </>
  );
}
