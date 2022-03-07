import { FC } from 'react';

import styles from './Message.module.css';

import { MessagePropsType } from 'components/dialogs/types';
import { ComponentReturnType } from 'types';

// export const Message = ({ messageText }: MessagePropsType): ComponentReturnType => (
//   <div className={styles.message}>{messageText}</div>
// );

export const Message: FC<MessagePropsType> = ({ messageText }): ComponentReturnType => {
  const someContent = `___`;

  return (
    <div className={styles.message}>
      {messageText}
      <div>{someContent}</div>
    </div>
  );
};
