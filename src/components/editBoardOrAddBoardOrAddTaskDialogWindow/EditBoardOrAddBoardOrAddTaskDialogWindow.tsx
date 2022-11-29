import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';
import { useTranslation } from 'react-i18next';

type EditBoardOrAddBoardOrAddTaskDialogWindowProps = {
  titleError: boolean;
  onFocus: () => void;
  getRefs: () => {
    inputRefTitle: React.RefObject<HTMLInputElement>;
    inputRefDescription: React.RefObject<HTMLSelectElement>;
  };
};

const EditBoardOrAddBoardOrAddTaskDialogWindow = ({
  title,
  onFocus,
  onClose,
  onOk,
  getRefs,
  isModalOpen,
  titleError,
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
            onFocus={onFocus}
            autoFocus
            margin="dense"
            id="title-input"
            type="text"
            fullWidth
            variant="outlined"
            inputRef={inputRefTitle}
          />
          <TextField
            inputRef={inputRefDescription}
            label={descriptionLabel}
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
    </div>
  );
};

export default EditBoardOrAddBoardOrAddTaskDialogWindow;
