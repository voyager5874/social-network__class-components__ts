import { MessageType } from 'components/dialogs/types';

export const getLastMessages = (talks: {
  [personID: string]: MessageType[];
}): MessageType[] => {
  const lastMessages = [];
  // using loops to for in objects will include properties
  // inherited through the prototype chain. This behavior may result in
  // unexpected items in the for loop.
  // for (const person in talks) {
  //   lastMessages.push(talks[person][0]);
  // }
  const interlocutorsID: Array<string> = Object.keys(talks);
  for (let i = 0; i < interlocutorsID.length; i += 1) {
    lastMessages.push(talks[interlocutorsID[i]][0]);
  }

  return lastMessages;
};
