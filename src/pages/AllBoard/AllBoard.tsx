// Library
import React, { useEffect, useRef, useState } from 'react';
// Components
import Boards from 'components/boards/boards';
import ModalForCreateDesk from '../../components/createBoardDialog';
// Style
import './AllBoard.sass';
// Other
import { useAppDispatch, useAppSelector } from 'interface/interface';
import { useTranslation } from 'react-i18next';
import { selectToken, selectUser, selectUsers } from '../../toolkitRedux/userSlice/userSlice';
import { fetchCreateBoard } from '../../api/boardsApi';
import fetchUsersThunk from '../../toolkitRedux/userSlice/fetchUsersThunk';

export const isInputRefValueEmpty = (inputRef: React.RefObject<HTMLInputElement>) =>
  inputRef.current?.value === '';

const AllBoard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const usersIDs = users?.map((user) => user._id);

  useEffect(() => {
    (async () => {
      token && dispatch(fetchUsersThunk(token));
      console.log('useEffect', token);
    })();
  }, [token]);

  const isArgs = () => {
    return !!(token && usersIDs && users && user);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchErrorMsg, setFetchErrMsg] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null!);
  const selectRef = useRef<HTMLSelectElement>(null!);

  const getRefs = () => ({ inputRef, selectRef });

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
    isInputRefValueEmpty(inputRef) ? setTitleError(true) : setTitleError(false);
    if (!isInputRefValueEmpty(inputRef)) {
      token &&
        dispatch(
          fetchCreateBoard({
            title: inputRef.current.value,
            users: usersIDs as string[],
            owner: user?.userId as string,
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
        owner={user?.userId ?? ''}
        users={users}
        onTitleFocus={onTitleInputFocus}
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
