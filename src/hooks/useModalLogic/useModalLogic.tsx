import getInitStateForModalLogic from './getInitStateForModalLogic';
import useFetchReducer, { ActionKind } from './reducer';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../interface/interface';
import { selectToken } from '../../toolkitRedux/userSlice/userSlice';

const useModalLogic = () => {
  const { t } = useTranslation();
  const token = useAppSelector(selectToken);
  const [values, dispatch] = useFetchReducer(getInitStateForModalLogic());

  const getRefs = () => ({
    inputRefTitle: values.inputRefTitle,
    inputRefDescription: values.inputRefDescription,
  });

  const resetTitleInputError = () => {
    dispatch({ type: ActionKind.updateTitleError, payload: false });
  };
  const resetDescriptionInputError = () => {
    dispatch({ type: ActionKind.updateDescriptionError, payload: false });
  };

  const closeModal = () => {
    dispatch({ type: ActionKind.resetErrors });
  };
  const openModal = () => {
    dispatch({ type: ActionKind.updateIsModalOpen, payload: true });
  };

  const updateFetchErrorMessage = (msg: string | null) => {
    dispatch({ type: ActionKind.updateFetchErrorMsg, payload: msg });
  };

  return {
    closeModal,
    openModal,
    resetTitleInputError,
    resetDescriptionInputError,
    getRefs,
    checkRefs: () => dispatch({ type: ActionKind.checkRefs }),
    updateFetchErrorMessage,
    t,
    token,
    values,
  };
};

export default useModalLogic;
