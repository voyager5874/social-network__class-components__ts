import { useSelector } from 'react-redux';

import styles from './Dialog.module.css';

import { Message } from 'components/dialogs/message/Message';
import { MessageType } from 'components/dialogs/types';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export type DialogPropsType = {
  interlocutorID: string;
};
export const Dialog = ({ interlocutorID }: DialogPropsType): ComponentReturnType => {
  const dialog = useSelector<RootStateType, MessageType[]>(
    state => state.messages.messages[interlocutorID],
  );
  return (
    <div className={styles.dialog}>
      {dialog.map(({ messageID, messageText }) => (
        <Message key={messageID} messageText={messageText} />
      ))}
    </div>
  );
};
