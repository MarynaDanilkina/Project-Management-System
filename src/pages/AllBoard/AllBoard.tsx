// Library
import React, { useRef, useState } from 'react';
// Components
import Boards from 'components/boards/boards';
import ModalForCreateDesk from '../../components/editBoardOrAddBoardOrAddTaskDialogWindow';
// Style
import './AllBoard.sass';
// Other
import { useAppDispatch, useAppSelector } from 'interface/interface';
import { useTranslation } from 'react-i18next';
import { selectToken } from '../../toolkitRedux/userSlice/userSlice';

export const isInputRefValueEmpty = (inputRef: React.RefObject<HTMLInputElement>) =>
  inputRef.current?.value === '';

const AllBoard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const [modalOpen, setModalOpen] = useState(false);
  const [fetchErrorMsg, setFetchErrMsg] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const inputRefTitle = useRef<HTMLInputElement>(null!);
  const inputRefDescription = useRef<HTMLInputElement>(null!);

  const getRefs = () => ({ inputRefTitle, inputRefDescription });

  const resetErrors = () => {
    setTitleError(false);
    setDescriptionError(false);
  };
  const onDescriptionInputFocus = () => {
    setDescriptionError(false);
  };
  const onTitleInputFocus = () => {
    setTitleError(false);
  };

  const onClose = () => {
    resetErrors();
    setModalOpen(false);
  };

  const onOk = () => {
    isInputRefValueEmpty(inputRefTitle) ? setTitleError(true) : setTitleError(false);
    isInputRefValueEmpty(inputRefDescription)
      ? setDescriptionError(true)
      : setDescriptionError(false);
    if (!isInputRefValueEmpty(inputRefTitle) && !isInputRefValueEmpty(inputRefDescription)) {
      /*
      token &&
        dispatch(
          fetchCreateBoard({
            title: inputRefTitle.current.value,
            description: inputRefDescription.current.value,
            token,
          })
        )
          .unwrap()
          .then(() => {
            if (fetchErrorMsg) {
              setFetchErrMsg('');
            }
            setModalOpen(false);
          })
          .catch((err) => setFetchErrMsg(err.message));
      setModalOpen(false);
       */
    }
  };
  return (
    <div className="allBoard__container">
      <div className="allBoard__wrapper">
        <div className="allBoard__link">
          <h2>{t('your_boards')}</h2>
          <button className="allBoard__button-add" onClick={() => setModalOpen(true)}>
            + {t('add')}
          </button>
        </div>
        <div className="AllBoards__container">
          <Boards />
        </div>
      </div>
      <ModalForCreateDesk
        fetchErrorMsg={fetchErrorMsg}
        titleError={titleError}
        descriptionError={descriptionError}
        onTitleFocus={onTitleInputFocus}
        onDescriptionFocus={onDescriptionInputFocus}
        getRefs={getRefs}
        onOk={onOk}
        onClose={onClose}
        isModalOpen={modalOpen}
      />
    </div>
  );
};
export default AllBoard;
//<BackdropComponent open={true} />
