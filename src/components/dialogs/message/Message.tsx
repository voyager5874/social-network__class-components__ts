import { FC } from 'react';

import styles from './Message.module.css';

import noAvatar from 'components/common/assets/userWithoutPhoto.png';
import { MessagePropsType } from 'components/dialogs/types';
import { ComponentReturnType } from 'types';

// export const Message = ({ messageText }: MessagePropsType): ComponentReturnType => (
//   <div className={styles.message}>{messageText}</div>
// );

export const Message: FC<MessagePropsType> = ({
  userName,
  messageText,
  addedAt,
  senderAvatar,
  isLoggedInUserTheAuthor,
}): ComponentReturnType => {
  const msec = Date.parse(addedAt);
  const date = new Date(msec);
  const stringTime = date.toLocaleTimeString();
  const stringDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div
      className={
        isLoggedInUserTheAuthor
          ? `${styles.messageContainer} ${styles.messageContainerRight} `
          : styles.messageContainer
      }
    >
      {!isLoggedInUserTheAuthor && (
        <>
          <img src={senderAvatar || noAvatar} alt="avatar" className={styles.avatar} />
          <div className={styles.decorator} />
        </>
      )}
      <div
        className={
          isLoggedInUserTheAuthor
            ? `${styles.bubble} ${styles.bubbleRight}`
            : styles.bubble
        }
      >
        <div className={styles.author}>{userName}</div>
        <div className={styles.text}>{messageText}</div>
        <div className={styles.time}>{stringDate}</div>
        <div className={styles.time}>{stringTime}</div>
      </div>
      {isLoggedInUserTheAuthor && (
        <>
          <div className={styles.decoratorRight} />
          <img src={senderAvatar || noAvatar} alt="avatar" className={styles.avatar} />
        </>
      )}
    </div>
  );
};

// (
//   <div className={styles.message}>
//     {messageText}
//     <div>{addedAt}</div>
//   </div>
// )
