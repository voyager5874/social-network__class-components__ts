import { v1 } from 'uuid';

import { MessageSimpleType } from 'components/dialogs/types';
import { DialogPageStateType } from 'store/types';

const initialState: DialogPageStateType = {
  interlocutors: [
    { id: v1(), name: 'Dimych' },
    { id: v1(), name: 'Andrew' },
    { id: v1(), name: 'Sveta' },
    { id: v1(), name: 'Sasha' },
    { id: v1(), name: 'Viktor' },
    { id: v1(), name: 'Valera' },
  ],
  messages: [
    { id: v1(), messageText: 'Hi' },
    { id: v1(), messageText: 'How is your it-kamasutra?' },
    { id: v1(), messageText: 'Yo' },
    { id: v1(), messageText: 'Yo' },
    { id: v1(), messageText: 'Yo' },
  ],
  newMessageBody: '',
};

export const dialogsPageReducer = (
  state: DialogPageStateType = initialState,
  action: DialogsPageActionsType,
): DialogPageStateType => {
  switch (action.type) {
    case 'ADD-MESSAGE': {
      const newMessage: MessageSimpleType = {
        id: v1(),
        messageText: state.newMessageBody,
      };
      const stateCopy = { ...state, messages: [...state.messages] };
      stateCopy.messages.unshift(newMessage);
      return stateCopy;
    }
    case 'UPDATE-NEW-MESSAGE-TEXT':
      return { ...state, newMessageBody: action.content };
    default:
      return state;
  }
};

export type DialogsPageActionsType =
  | ReturnType<typeof addMessageAC>
  | ReturnType<typeof updateNewMessageTextAC>;

export const addMessageAC = () =>
  ({
    type: 'ADD-MESSAGE',
  } as const);

export const updateNewMessageTextAC = (content: string) =>
  ({
    type: 'UPDATE-NEW-MESSAGE-TEXT',
    content,
  } as const);
