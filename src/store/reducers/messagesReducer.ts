import { v1 } from 'uuid';

import { MessageType } from 'components/dialogs/types';
import { ChandlerID, MonicaID, PhoebeID, RachelID, RossID } from 'store/stubData';
import { MessagesStateType } from 'store/types';

const initialState: MessagesStateType = {
  messages: {
    [RossID]: [
      { messageID: v1(), interlocutorID: RossID, messageText: 'Hello I am Ross' },
      {
        messageID: v1(),
        interlocutorID: RossID,
        messageText: 'My favourite series is Friends',
      },
      {
        messageID: v1(),
        interlocutorID: RossID,
        messageText: 'Paleontology is the best',
      },
      { messageID: v1(), interlocutorID: RossID, messageText: 'Tenure' },
    ],
    [MonicaID]: [
      { messageID: v1(), interlocutorID: MonicaID, messageText: 'Hello I am Monica' },
      {
        messageID: v1(),
        interlocutorID: MonicaID,
        messageText: 'My favourite movie is Gone with the wind',
      },
      {
        messageID: v1(),
        interlocutorID: MonicaID,
        messageText: 'Cooking is the best',
      },
      { messageID: v1(), interlocutorID: MonicaID, messageText: 'Ordnung!' },
    ],
    [ChandlerID]: [
      { messageID: v1(), interlocutorID: ChandlerID, messageText: 'Hello I am Chandler' },
      {
        messageID: v1(),
        interlocutorID: ChandlerID,
        messageText: 'My favourite movie is Dumb & Dumber',
      },
      {
        messageID: v1(),
        interlocutorID: ChandlerID,
        messageText: 'Humour is the best',
      },
      { messageID: v1(), interlocutorID: ChandlerID, messageText: 'On a roll' },
    ],
    [PhoebeID]: [
      { messageID: v1(), interlocutorID: PhoebeID, messageText: 'Hello I am Phoebe' },
      {
        messageID: v1(),
        interlocutorID: PhoebeID,
        messageText: "My favourite movie is One flew over the cuckoo's nest",
      },
      {
        messageID: v1(),
        interlocutorID: PhoebeID,
        messageText: 'Peace is the best',
      },
      { messageID: v1(), interlocutorID: PhoebeID, messageText: 'One of a kind' },
    ],
    [RachelID]: [
      { messageID: v1(), interlocutorID: PhoebeID, messageText: 'Hello I am Rachel' },
      {
        messageID: v1(),
        interlocutorID: RachelID,
        messageText: 'My favourite movie is Coco Before Chanel',
      },
      {
        messageID: v1(),
        interlocutorID: PhoebeID,
        messageText: 'Fashion is the best',
      },
      {
        messageID: v1(),
        interlocutorID: PhoebeID,
        messageText: "I'm trained for nothing",
      },
    ],
  },
  newMessageBody: '',
};

export const messagesReducer = (
  state: MessagesStateType = initialState,
  action: MessagesReducerActionsType,
): MessagesStateType => {
  switch (action.type) {
    case 'UPDATE-NEW-MESSAGE-TEXT':
      return { ...state, newMessageBody: action.content };
    case 'ADD-MESSAGE': {
      const newMessage: MessageType = {
        interlocutorID: action.interlocutorID,
        messageID: v1(),
        messageText: state.newMessageBody,
      };
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.interlocutorID]: [newMessage, ...state.messages[action.interlocutorID]],
        },
      };
    }
    default:
      return state;
  }
};

export type MessagesReducerActionsType =
  | ReturnType<typeof addMessageAC>
  | ReturnType<typeof updateNewMessageTextAC>;

export const addMessageAC = (interlocutorID: string) =>
  ({
    type: 'ADD-MESSAGE',
    interlocutorID,
  } as const);

export const updateNewMessageTextAC = (content: string) =>
  ({
    type: 'UPDATE-NEW-MESSAGE-TEXT',
    content,
  } as const);
