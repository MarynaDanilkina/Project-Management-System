import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';

type AddColumnProps = { titleError: boolean; onFocus: () => void };

export default function AddColumnDialogWindow({
  onClose,
  onOk,
  onFocus,
  isModalOpen,
  titleError,
}: DialogWindowProps & AddColumnProps) {
  return (
    <>
      <CustomFormControl title="Add column" onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
        <DialogContent>
          <TextField
            margin="dense"
            onFocus={onFocus}
            id="board-title"
            label="Title of the column"
            type="text"
            fullWidth
            variant="outlined"
            error={titleError}
          />
        </DialogContent>
      </CustomFormControl>
    </>
  );
}
