import { Nullable } from 'types';

export type InterlocutorType = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  // lastMessage: string; // I will have to use the other request for this
  photos: {
    small: string;
    large: string;
  };
};

export type MessagePropsType = {
  userName: string;
  messageText: string;
  addedAt: string;
  senderAvatar: Nullable<string>;
  isLoggedInUserTheAuthor: boolean;
};

export type MessageType = {
  messageID: string;
  interlocutorID: string;
  messageText: string;
};

export type MessageSimpleType = {
  id: string;
  messageText: string;
};
