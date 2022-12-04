import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';
import { useTranslation } from 'react-i18next';
import { Alert, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { IUser } from '../../api/usersApi';

type CreateBoardDialogProps = {
  titleError: boolean;
  onTitleFocus: () => void;
  owner: string;
  fetchErrorMsg: string;
  users: IUser[] | null;
  getRefs: () => {
    inputRef: React.RefObject<HTMLInputElement>;
    selectRef: React.RefObject<HTMLSelectElement>;
  };
};

const CreateBoardDialog = ({
  title,
  onTitleFocus,
  onClose,
  onOk,
  getRefs,
  isModalOpen,
  titleError,
  fetchErrorMsg,
  owner,
  users,
}: CreateBoardDialogProps & DialogWindowProps) => {
  const { t } = useTranslation();
  const { inputRef, selectRef } = getRefs();
  const inputLabel = t('title');
  const selectLabel = t('owner');
  console.log(users, 'users dialog');
  console.log(owner, 'owner dialog');
  return (
    <div onClick={(e) => e.preventDefault()}>
      <CustomFormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
        <DialogContent>
          <TextField
            error={titleError}
            label={inputLabel}
            onFocus={onTitleFocus}
            inputRef={inputRef}
            autoFocus
            margin="dense"
            id="title-input"
            type="text"
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth sx={{ mt: '2rem' }}>
            <InputLabel id="select-for-label">{selectLabel}</InputLabel>
            <Select
              defaultValue={owner}
              labelId="demo-simple-select-label"
              id="select-for"
              label="For"
              inputRef={selectRef}
            >
              {users?.map((user) => (
                <MenuItem value={user._id} key={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
      </CustomFormControl>

      {fetchErrorMsg !== '' && (
        <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
          <Alert severity="error" sx={{ fontSize: '1.4rem' }}>
            {fetchErrorMsg}
          </Alert>
        </Grid>
      )}
    </div>
  );
};

export default CreateBoardDialog;
