import { FC } from 'react';

import { BsEnvelopeFill, BsEnvelopeOpenFill } from 'react-icons/bs';

import styles from './Message.module.css';

import noAvatar from 'components/common/assets/userWithoutPhoto.png';
import { MessagePropsType } from 'components/dialogs/types';
import { ComponentReturnType } from 'types';
import { formatDateString } from 'utils';

// export const Message = ({ messageText }: MessagePropsType): ComponentReturnType => (
//   <div className={styles.message}>{messageText}</div>
// );

export const Message: FC<MessagePropsType> = ({
  userName,
  messageText,
  addedAt,
  senderAvatar,
  isLoggedInUserTheAuthor,
  viewed,
}): ComponentReturnType => {
  const formattedDate = formatDateString(addedAt);
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
        <div className={styles.metadataContainer}>
          <div>{viewed ? <BsEnvelopeOpenFill /> : <BsEnvelopeFill />}</div>
          <div className={styles.time}>
            <div className={styles.timeItem}>{formattedDate.date}</div>
            <div className={styles.timeItem}>{formattedDate.time}</div>
          </div>
        </div>
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
