import { useSelector } from 'react-redux';

import styles from './Conversations.module.css';

import { Message } from 'components/dialogs/message/Message';
import { InterlocutorType, MessageType } from 'components/dialogs/types';
import { MonicaID } from 'store/stubData';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export const Conversations = (): ComponentReturnType => {
  const chats = useSelector<RootStateType, { [personID: string]: MessageType[] }>(
    state => state.messages.messages,
  );
  const interlocutors = useSelector<RootStateType, InterlocutorType[]>(
    state => state.interlocutors,
  );
  return (
    <div className={styles.conversations}>
      {interlocutors.map(person => {
        console.log(person.id);
        console.log(chats[person.id]);

        return (
          <div key={person.id} className={styles.chat}>
            <h3>{person.name}</h3>
            <Message messageText={chats[person.id][0].messageText} />
          </div>
        );
      })}
    </div>
  );
};
