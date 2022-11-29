import React, { createRef } from 'react';

export type ModalLogicState = {
  token: null | string;
  isModalOpen: boolean;
  fetchErrorMsg: null | string;
  titleError: boolean;
  descriptionError: boolean;
  inputRefTitle: React.RefObject<HTMLInputElement>;
  inputRefDescription: React.RefObject<HTMLInputElement>;
};
const getInitStateForModalLogic = (): ModalLogicState => ({
  token: null,
  isModalOpen: false,
  fetchErrorMsg: null,
  titleError: false,
  descriptionError: false,
  inputRefTitle: createRef<HTMLInputElement>(),
  inputRefDescription: createRef<HTMLInputElement>(),
});

export default getInitStateForModalLogic;
