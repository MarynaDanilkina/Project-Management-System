import { ModalLogicState } from './getInitStateForModalLogic';
import { Reducer, useReducer } from 'react';
import { checkRefValueForBeingEmpty } from '../../components/button_addColimn/Addcolumn';

export enum ActionKind {
  updateToken = 'updateToken',

  updateIsModalOpen = 'updateIsModalOpen',
  resetErrors = 'resetErrors',
  checkRefs = 'checkRefs',
  updateTitleError = 'updateTitleError',
  updateDescriptionError = 'updateDescriptionError',
  updateFetchErrorMsg = 'updateFetchErrorMsg',
}

type Action =
  | { type: ActionKind.updateToken; payload: string | null }
  | { type: ActionKind.resetErrors }
  | { type: ActionKind.updateIsModalOpen; payload: boolean }
  | { type: ActionKind.checkRefs }
  | { type: ActionKind.updateTitleError; payload: boolean }
  | { type: ActionKind.updateDescriptionError; payload: boolean }
  | { type: ActionKind.updateFetchErrorMsg; payload: string | null };
const reducer = (state: ModalLogicState, action: Action) => {
  switch (action.type) {
    case ActionKind.updateToken:
      return { ...state, token: action.payload };
    case ActionKind.updateIsModalOpen:
      return { ...state, isModalOpen: action.payload };
    case ActionKind.resetErrors:
      return {
        ...state,
        titleError: false,
        descriptionError: false,
        fetchErrorMsg: null,
        isModalOpen: false,
      };
    case ActionKind.checkRefs:
      return {
        ...state,
        titleError: checkRefValueForBeingEmpty(state.inputRefTitle),
        descriptionError: checkRefValueForBeingEmpty(state.inputRefDescription),
      };
    case ActionKind.updateTitleError:
      return { ...state, titleError: action.payload };
    case ActionKind.updateDescriptionError:
      return { ...state, descriptionError: action.payload };
    case ActionKind.updateFetchErrorMsg:
      return { ...state, fetchErrorMsg: action.payload };
  }
};

const useFetchReducer = (initValue: ModalLogicState) =>
  useReducer<Reducer<ModalLogicState, Action>>(reducer, initValue);

export default useFetchReducer;
