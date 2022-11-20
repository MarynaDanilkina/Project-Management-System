import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';

type EditBoardOrAddBoardOrAddTaskDialogWindowProps = {
  titleError: boolean;
  titleLabel: string;
  descreptionLabel: string;
  titleInputID: string;
  descreptionInputID: string;
  onFocus: () => void;
  getRefs: () => {
    inputRefTitle: React.RefObject<HTMLInputElement>;
    inputRefDescreption: React.RefObject<HTMLSelectElement>;
  };
};

const EditBoardOrAddBoardOrAddTaskDialogWindow = (
  props: EditBoardOrAddBoardOrAddTaskDialogWindowProps & DialogWindowProps
) => {
  const { inputRefTitle, inputRefDescreption } = props.getRefs();
  return (
    <>
      <CustomFormControl
        title={props.title}
        onClose={props.onClose}
        onOk={props.onOk}
        isModalOpen={props.isModalOpen}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id={props.titleInputID}
            label={props.titleLabel}
            type="text"
            fullWidth
            variant="outlined"
            error={props.titleError}
            onFocus={props.onFocus}
            inputRef={inputRefTitle}
          />
          <TextField
            margin="dense"
            inputRef={inputRefDescreption}
            id={props.descreptionInputID}
            label={props.descreptionLabel}
            type="text"
            fullWidth
            variant="outlined"
            multiline={true}
            rows={5}
          />
        </DialogContent>
      </CustomFormControl>
    </>
  );
};

export default EditBoardOrAddBoardOrAddTaskDialogWindow;
