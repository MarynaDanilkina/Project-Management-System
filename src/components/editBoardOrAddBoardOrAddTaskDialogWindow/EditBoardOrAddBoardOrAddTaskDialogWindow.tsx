import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CustomFormControl, {
  DialogWindowProps,
} from 'components/customFormControl/CustomFormControl';

type EditBoardOrAddBoardOrAddTaskDialogWindowProps = {
  titleError: boolean;
  titleLabel: string;
  descriptionLabel: string;
  titleInputID: string;
  descriptionInputID: string;
  onFocus: () => void;
  getRefs: () => {
    inputRefTitle: React.RefObject<HTMLInputElement>;
    inputRefDescription: React.RefObject<HTMLSelectElement>;
  };
};

const EditBoardOrAddBoardOrAddTaskDialogWindow = (
  props: EditBoardOrAddBoardOrAddTaskDialogWindowProps & DialogWindowProps
) => {
  const { inputRefTitle, inputRefDescription } = props.getRefs();
  return (
    <div onClick={(e) => e.preventDefault()}>
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
            inputRef={inputRefDescription}
            id={props.descriptionInputID}
            label={props.descriptionLabel}
            type="text"
            fullWidth
            variant="outlined"
            multiline={true}
            rows={5}
          />
        </DialogContent>
      </CustomFormControl>
    </div>
  );
};

export default EditBoardOrAddBoardOrAddTaskDialogWindow;
