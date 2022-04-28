import { ChangeEvent, useEffect, useState } from 'react';

import { BsArrowLeft, BsImageFill } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useParams } from 'react-router-dom';

import styles from './Dialogs.module.css';

import { UniversalButton } from 'components/common/universalButton/UniversalButton';
import { Dialog } from 'components/dialogs/dialog/Dialog';
import { Interlocutor } from 'components/dialogs/interlocutor/Interlocutor';
import { InterlocutorType } from 'components/dialogs/types';
import { FIRST_ARRAY_ITEM_INDEX } from 'constants/base';
import { sendMessage } from 'store/middlewares';
import { getInterlocutors } from 'store/middlewares/dialogs';
import { setCurrentInterlocutor } from 'store/reducers/messagesReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

export const Dialogs = (): ComponentReturnType => {
  // eslint-disable-next-line no-console
  console.log('dialogs rendering');
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState('');
  const [messageFieldExpanded, setMessageFieldExpanded] = useState(false);
  // const [visiblePart, setVisiblePart] = useState<'interlocutors' | 'messages'>(
  //   'interlocutors',
  // );
  const [showChat, setShowChat] = useState(false);
  const VW_THRESHOLD = 1100;

  useEffect(() => {
    dispatch(getInterlocutors());
  }, []);

  const userIsLoggedIn = useSelector<RootStateType, boolean>(
    state => state.authData.isLoggedIn,
  );

  const appInitialized = useSelector<RootStateType, boolean>(
    state => state.app.isInitialized,
  );

  const people = useSelector<RootStateType, InterlocutorType[]>(
    state => state.interlocutors,
  );
  const recentInterlocutor = people[FIRST_ARRAY_ITEM_INDEX];

  const { interlocutorID } = useParams();

  useEffect(() => {
    dispatch(setCurrentInterlocutor(Number(interlocutorID)));
  }, [interlocutorID]);

  const currentInterlocutorName = interlocutorID
    ? people.filter(user => user.id === Number(interlocutorID))[FIRST_ARRAY_ITEM_INDEX]
        .userName
    : null;

  const handleNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessageText(event.currentTarget.value);
  };

  const expandMessageField = (): void => {
    setMessageFieldExpanded(true);
  };
  const collapseMessageField = (): void => {
    setMessageFieldExpanded(false);
  };

  const handleSendMessage = (): void => {
    if (!interlocutorID) return;
    const idAsNumber = Number(interlocutorID);
    dispatch(sendMessage(idAsNumber, messageText));
    setMessageText('');
  };

  // const showMessages = () => {
  //   if (window.innerWidth > VW_THRESHOLD) return;
  //   setVisiblePart('messages');
  // };
  //
  // const showInterlocutors = () => {
  //   if (window.innerWidth >= VW_THRESHOLD) return;
  //   setVisiblePart('interlocutors');
  // };

  const toggleShowChat = () => {
    // if (window.innerWidth > VW_THRESHOLD) return;
    setShowChat(!showChat);
  };

  if (!userIsLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  if (appInitialized && !people.length) {
    // eslint-disable-next-line no-alert
    alert('no active dialogs yet');
    return <Navigate replace to="/users" />;
  }

  if (!interlocutorID) {
    return <Navigate to={`${recentInterlocutor.id}`} />;
  }

  return (
    <div className={styles.dialogs}>
      <div
        className={`${styles.pageLeft} ${
          // visiblePart === 'messages' ? styles.hidden : ''
          showChat ? styles.hidden : ''
        }`}
      >
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
                onClick={toggleShowChat}
                chosen={id === Number(interlocutorID)}
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

      <div
        className={`${styles.pageRight} ${
          // visiblePart === 'messages' ? styles.visible : ''
          showChat ? styles.visible : ''
        }`}
      >
        <div className={styles.chatHeader}>
          <BsArrowLeft onClick={toggleShowChat} className={styles.backIcon} />
          <NavLink to={`../profile/${interlocutorID}`}>{currentInterlocutorName}</NavLink>
        </div>
        <Dialog interlocutorID={Number(interlocutorID)} hidden={messageFieldExpanded} />
        <div
          className={`${styles.sendMessageForm} ${
            messageFieldExpanded ? styles.sendMessageFormExpanded : ''
          }`}
        >
          <textarea
            placeholder="Write a message"
            onChange={handleNewMessageChange}
            value={messageText}
            className={`${styles.textarea} ${
              messageFieldExpanded ? styles.textareaExpanded : ''
            }`}
          />
          <div className={styles.sendMessageFormControls}>
            {!messageFieldExpanded && (
              <MdExpandLess
                className={styles.expandButton}
                onClick={expandMessageField}
              />
            )}
            {messageFieldExpanded && (
              <MdExpandMore
                className={styles.collapseButton}
                onClick={collapseMessageField}
              />
            )}

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
