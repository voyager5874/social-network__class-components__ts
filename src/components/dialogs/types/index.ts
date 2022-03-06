export type InterlocutorType = {
  name: string;
  id: string;
};

export type MessagePropsType = {
  messageText: string;
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
