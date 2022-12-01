import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';
import { useTranslation } from 'react-i18next';
import { Alert, Grid } from '@mui/material';

type EditBoardOrAddBoardOrAddTaskDialogWindowProps = {
  titleError: boolean;
  descriptionError: boolean;
  onTitleFocus: () => void;
  onDescriptionFocus: () => void;
  inputDefaultTitleValue?: string;
  inputDefaultDescriptionValue?: string;
  fetchErrorMsg: string;
  getRefs: () => {
    inputRefTitle: React.RefObject<HTMLInputElement>;
    inputRefDescription: React.RefObject<HTMLInputElement>;
  };
};

const EditBoardOrAddBoardOrAddTaskDialogWindow = ({
  title,
  onDescriptionFocus,
  onTitleFocus,
  onClose,
  onOk,
  getRefs,
  isModalOpen,
  titleError,
  descriptionError,
  inputDefaultTitleValue,
  inputDefaultDescriptionValue,
  fetchErrorMsg,
}: EditBoardOrAddBoardOrAddTaskDialogWindowProps & DialogWindowProps) => {
  const { t } = useTranslation();
  const { inputRefTitle, inputRefDescription } = getRefs();
  const titleLabel = t('title');
  const descriptionLabel = t('description');
  return (
    <div onClick={(e) => e.preventDefault()}>
      <CustomFormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
        <DialogContent>
          <TextField
            error={titleError}
            label={titleLabel}
            onFocus={onTitleFocus}
            inputRef={inputRefTitle}
            defaultValue={inputDefaultTitleValue ?? ''}
            autoFocus
            margin="dense"
            id="title-input"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            inputRef={inputRefDescription}
            label={descriptionLabel}
            defaultValue={inputDefaultDescriptionValue ?? ''}
            onFocus={onDescriptionFocus}
            error={descriptionError}
            multiline={true}
            margin="dense"
            id="description-input"
            type="text"
            fullWidth
            variant="outlined"
            rows={5}
          />
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

export default EditBoardOrAddBoardOrAddTaskDialogWindow;
