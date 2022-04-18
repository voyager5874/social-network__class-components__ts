import { MessageOnServerType } from 'api/types';
import { InterlocutorsReducerActionsType } from 'store/reducers/interlocutorsReducer';
import { EntityStatus } from 'store/reducers/types';
import { Nullable } from 'types';

type MessagesReducerStateType = {
  messages: Array<MessageOnServerType>;
  totalCount: Nullable<number>;
  error: Nullable<string>;
  entityStatus: EntityStatus;
  currentInterlocutorID: Nullable<number>;
  currentPage: number;
  portionSize: number;
};

const initialState: MessagesReducerStateType = {
  messages: [] as Array<MessageOnServerType>,
  totalCount: null,
  error: null,
  entityStatus: EntityStatus.idle,
  currentInterlocutorID: null,
  currentPage: 1,
  portionSize: 10,
};

export const messagesReducer = (
  state: MessagesReducerStateType = initialState,
  action: MessagesReducerActionsType,
): MessagesReducerStateType => {
  switch (action.type) {
    case 'MESSAGES/ITEMS-LOADED':
      return { ...state, messages: action.data };
    case 'MESSAGES/TOTAL-COUNT-RECEIVED':
      return { ...state, totalCount: action.total };
    case 'MESSAGES/MORE-ITEMS-LOADED':
      return { ...state, messages: [...action.data, ...state.messages] };
    case 'MESSAGES/RESET-STATE':
      return { ...initialState };
    case 'MESSAGES/SET-STATUS':
      return { ...state, entityStatus: action.status };
    case 'MESSAGES/SET-CURRENT-INTERLOCUTOR':
      return { ...state, currentInterlocutorID: action.userID };
    case 'MESSAGES/SET-CURRENT-PAGE':
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
};

export type MessagesReducerActionsType =
  | ReturnType<typeof addMessageAC>
  | ReturnType<typeof setWithUserMessages>
  | ReturnType<typeof setMessagesEntityError>
  | ReturnType<typeof setWithUserMessagesTotalCount>
  | ReturnType<typeof resetMessagesReducerState>
  | ReturnType<typeof addMoreWithUserMessages>
  | ReturnType<typeof setMessagesEntityStatus>
  | ReturnType<typeof setCurrentInterlocutor>
  | ReturnType<typeof setMessagesCurrentPage>
  | InterlocutorsReducerActionsType;

export const addMessageAC = (interlocutorID: string) =>
  ({
    type: 'MESSAGES/MESSAGE-SENT',
    interlocutorID,
  } as const);

export const setWithUserMessages = (data: Array<MessageOnServerType>) =>
  ({
    type: 'MESSAGES/ITEMS-LOADED',
    data,
  } as const);

export const addMoreWithUserMessages = (data: Array<MessageOnServerType>) =>
  ({
    type: 'MESSAGES/MORE-ITEMS-LOADED',
    data,
  } as const);

export const setWithUserMessagesTotalCount = (total: number) =>
  ({
    type: 'MESSAGES/TOTAL-COUNT-RECEIVED',
    total,
  } as const);

export const setMessagesEntityError = (error: string) =>
  ({
    type: 'MESSAGES/ERROR-OCCURRED',
    error,
  } as const);

export const resetMessagesReducerState = () =>
  ({
    type: 'MESSAGES/RESET-STATE',
  } as const);

export const setMessagesEntityStatus = (status: EntityStatus) =>
  ({
    type: `MESSAGES/SET-STATUS`,
    status,
  } as const);

export const setCurrentInterlocutor = (userID: number) =>
  ({
    type: `MESSAGES/SET-CURRENT-INTERLOCUTOR`,
    userID,
  } as const);

export const setMessagesCurrentPage = (page: number) =>
  ({
    type: `MESSAGES/SET-CURRENT-PAGE`,
    page,
  } as const);
