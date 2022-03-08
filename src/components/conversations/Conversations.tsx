import { useSelector } from 'react-redux';

import styles from './Conversations.module.css';

import { Message } from 'components/dialogs/message/Message';
import { InterlocutorType, MessageType } from 'components/dialogs/types';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export const Conversations = (): ComponentReturnType => {
  const chats = useSelector<RootStateType, { [personID: string]: MessageType[] }>(
    state => state.messages.messages,
  );
  const interlocutors = useSelector<RootStateType, InterlocutorType[]>(
    state => state.interlocutors,
  );
  const FIRST_ELEMENT_INDEX = 0;

  return (
    <div className={styles.conversations}>
      {interlocutors.map(({ id, name }) => (
        <div key={id} className={styles.chat}>
          <h3>{name}</h3>
          <Message messageText={chats[id][FIRST_ELEMENT_INDEX].messageText} />
        </div>
      ))}
    </div>
  );
};
