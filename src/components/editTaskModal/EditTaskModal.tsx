import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import MyFormControl, { ModalWindowProps } from 'components/formControl/FormControl';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type EditTaskModalProps = {
  titleError: boolean;
  selectedValue: string;
  selectValues: string[];
  defaultValue: string;
  titleRef: React.RefObject<HTMLInputElement>;
  selectRef: React.RefObject<HTMLSelectElement>;
  onFocus: () => void;
};

export default function EditTaskModal({
  onClose,
  onOk,
  defaultValue,
  isModalOpen,
  title,
  selectedValue,
  selectValues,
  titleRef,
  selectRef,
  titleError,
  onFocus,
}: ModalWindowProps & EditTaskModalProps) {
  return (
    <>
      <MyFormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
        <>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              inputRef={titleRef}
              defaultValue={defaultValue}
              onFocus={onFocus}
              id="edit-task__input"
              label="Descreption"
              type="text"
              fullWidth
              variant="outlined"
              error={titleError}
              sx={{ mb: '1rem' }}
            />
            <FormControl fullWidth>
              <InputLabel id="select-for-label">For</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="select-for"
                value={selectedValue}
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
      </MyFormControl>
    </>
  );
}
