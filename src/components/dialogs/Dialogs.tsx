import { ChangeEvent, useEffect, useState } from 'react';

import { BsImageFill } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './Dialogs.module.css';

import { UniversalButton } from 'components/common/universalButton/UniversalButton';
import { Dialog } from 'components/dialogs/dialog/Dialog';
import { Interlocutor } from 'components/dialogs/interlocutor/Interlocutor';
import { InterlocutorType } from 'components/dialogs/types';
import { sendMessage } from 'store/middlewares';
import { getInterlocutors } from 'store/middlewares/dialogs';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export const Dialogs = (): ComponentReturnType => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterlocutors());
  }, []);

  const people = useSelector<RootStateType, InterlocutorType[]>(
    state => state.interlocutors,
  );

  const [messageText, setMessageText] = useState('');

  const { interlocutorID } = useParams();

  const currentInterlocutorName = useSelector<RootStateType, string>(state =>
    interlocutorID
      ? state.interlocutors.filter(user => user.id === Number(interlocutorID))[0].userName
      : 'Choose somebody',
  );

  const handleNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessageText(event.currentTarget.value);
  };

  const handleSendMessage = (): void => {
    if (!interlocutorID) return;
    const idAsNumber = Number(interlocutorID);
    dispatch(sendMessage(idAsNumber, messageText));
    setMessageText('');
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.pageLeft}>
        <div className={styles.peopleListHeader}>You were chatting with</div>
        <div className={styles.peopleList}>
          {people.map(
            ({
              id,
              userName,
              newMessagesCount,
              photos,
              hasNewMessages,
              lastUserActivityDate,
              lastDialogActivityDate,
            }) => (
              <Interlocutor
                key={id}
                id={id}
                userName={userName}
                photos={photos}
                newMessagesCount={newMessagesCount}
                lastUserActivityDate={lastUserActivityDate}
                hasNewMessages={hasNewMessages}
                lastDialogActivityDate={lastDialogActivityDate}
              />
            ),
          )}
        </div>
      </div>

      <div className={styles.messagesContainer}>
        <div className={styles.chatHeader}>{currentInterlocutorName}</div>

        <Dialog interlocutorID={Number(interlocutorID) || 3} />
        <div className={styles.sendMessageForm}>
          <TextareaAutosize
            placeholder="Write a message"
            onChange={handleNewMessageChange}
            value={messageText}
            className={styles.textarea}
          />
          <div className={styles.sendMessageFormControls}>
            <div className={styles.attachments}>
              <GrAttachment className={styles.attachmentItem} />
              <BsImageFill className={styles.attachmentItem} />
            </div>
            <UniversalButton
              type="submit"
              onClick={handleSendMessage}
              className={styles.button}
            >
              send message
            </UniversalButton>
          </div>
        </div>
      </div>
    </div>
  );
};
