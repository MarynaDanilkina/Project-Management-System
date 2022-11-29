import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type EditTaskModalProps = {
  titleError: boolean;
  selectDefaultValue: string;
  selectValues: string[];
  descriptionDefaultValue: string;
  onFocus: () => void;
  getRefs: () => {
    inputRef: React.RefObject<HTMLInputElement>;
    selectRef: React.RefObject<HTMLSelectElement>;
  };
};

export default function EditTaskModal({
  onClose,
  onOk,
  descriptionDefaultValue,
  isModalOpen,
  selectDefaultValue,
  selectValues,
  titleError,
  onFocus,
  getRefs,
}: DialogWindowProps & EditTaskModalProps) {
  const { inputRef, selectRef } = getRefs();
  return (
    <>
      <CustomFormControl
        title={'Edit task'}
        onClose={onClose}
        onOk={onOk}
        isModalOpen={isModalOpen}
      >
        <>
          <DialogContent>
            <TextField
              inputRef={inputRef}
              defaultValue={descriptionDefaultValue}
              onFocus={onFocus}
              error={titleError}
              id="edit-task__input"
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mb: '1rem' }}
            />
            <FormControl fullWidth>
              <InputLabel id="select-for-label">For</InputLabel>
              <Select
                defaultValue={selectDefaultValue}
                labelId="demo-simple-select-label"
                id="select-for"
                label="For"
                inputRef={selectRef}
              >
                {selectValues.map((selectValue) => (
                  <MenuItem value={selectValue} key={selectValue}>
                    {selectValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
        </>
      </CustomFormControl>
    </>
  );
}
