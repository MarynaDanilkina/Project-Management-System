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
  descreptionDefaultValue: string;
  onFocus: () => void;
  getRefs: () => {
    inputRef: React.RefObject<HTMLInputElement>;
    selectRef: React.RefObject<HTMLSelectElement>;
  };
};

export default function EditTaskModal({
  onClose,
  onOk,
  descreptionDefaultValue,
  isModalOpen,
  title,
  selectDefaultValue,
  selectValues,
  titleError,
  onFocus,
  getRefs,
}: DialogWindowProps & EditTaskModalProps) {
  const { inputRef, selectRef } = getRefs();
  return (
    <>
      <CustomFormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
        <>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              inputRef={inputRef}
              defaultValue={descreptionDefaultValue}
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
                defaultValue={selectDefaultValue}
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
