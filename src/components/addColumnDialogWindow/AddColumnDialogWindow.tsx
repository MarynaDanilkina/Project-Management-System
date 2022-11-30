import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';
import { useTranslation } from 'react-i18next';
import { Alert, Grid } from '@mui/material';

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
              onFocus={onFocus}
              inputRef={ref}
              label={t('title')}
              margin="dense"
              id="board-title"
              type="text"
              fullWidth
              variant="outlined"
            />
            {titleError && (
              <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
                <Alert severity="error" sx={{ fontSize: '1.4rem' }}>
                  It should not be empty;
                </Alert>
              </Grid>
            )}
          </DialogContent>
        </CustomFormControl>
      </>
    );
  }
);
