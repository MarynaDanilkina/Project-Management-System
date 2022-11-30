import React from 'react';

const isInputRefValueEmpty = (inputRef: React.RefObject<HTMLInputElement>) =>
  inputRef.current?.value.trim() === '';

export default isInputRefValueEmpty;
