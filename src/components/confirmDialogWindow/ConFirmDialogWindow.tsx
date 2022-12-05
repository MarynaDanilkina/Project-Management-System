import React from 'react';
import FormControl from 'components/customFormControl';
import { DialogWindowProps } from 'components/customFormControl/CustomFormControl';

export default function ConfirmDialogWindow({
  title = 'Are you sure?',
  onClose,
  onOk,
  isModalOpen,
}: DialogWindowProps) {
  return (
    <div onClick={(e: React.MouseEvent) => e.preventDefault()}>
      <FormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen} />
    </div>
  );
}
