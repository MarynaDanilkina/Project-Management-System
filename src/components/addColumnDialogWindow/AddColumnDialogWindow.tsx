import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';
import { useTranslation } from 'react-i18next';

type AddColumnProps = { titleError: boolean; onFocus: () => void };

export default React.forwardRef<HTMLInputElement, DialogWindowProps & AddColumnProps>(
  function AddColumnDialogWindow(
    { onClose, onOk, onFocus, isModalOpen, titleError }: DialogWindowProps & AddColumnProps,
    ref
  ) {
    const { t } = useTranslation();
    const title = t('add_column');

    return (
      <>
        <CustomFormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen}>
          <DialogContent>
            <TextField
              error={titleError}
              inputRef={ref}
              label={t('title')}
              onFocus={onFocus}
              margin="dense"
              id="board-title"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
        </CustomFormControl>
      </>
    );
  }
);
