import { MessageOnServerType } from 'api/types';
import { InterlocutorsReducerActionsType } from 'store/reducers/interlocutorsReducer';
import { Nullable } from 'types';

type MessagesReducerStateType = {
  messages: Array<MessageOnServerType>;
  totalCount: Nullable<number>;
  error: Nullable<string>;
};

const initialState: MessagesReducerStateType = {
  messages: [] as Array<MessageOnServerType>,
  totalCount: null,
  error: null,
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
    case 'MESSAGES/RESET-STATE':
      return { ...initialState };
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
