import React from 'react';
import FormControl from 'components/formControl';
import { ModalWindowProps } from 'components/formControl/FormControl';

export default function ModalWindow({
  title = 'Are you sure?',
  onClose,
  onOk,
  isModalOpen,
}: ModalWindowProps) {
  return (
    <>
      <FormControl title={title} onClose={onClose} onOk={onOk} isModalOpen={isModalOpen} />
    </>
  );
}
