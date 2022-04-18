import { FC, useEffect, useLayoutEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './Dialog.module.css';

import { MessageOnServerType } from 'api/types';
import { Message } from 'components/dialogs/message/Message';
import { getWithUserMessages } from 'store/middlewares/dialogs';
import { setMessagesCurrentPage } from 'store/reducers/messagesReducer';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

export type DialogPropsType = {
  interlocutorID: number;
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  hidden?: boolean;
};
export const Dialog: FC<DialogPropsType> = ({
  interlocutorID,
  className = '',
  hidden = false,
}): ComponentReturnType => {
  const dispatch = useDispatch();
  // console.log('interlocutorID', interlocutorID);
  const dialogContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    debugger;
    dispatch(getWithUserMessages(interlocutorID, 1, 10));
  }, []);

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, 10));
  }, [interlocutorID]);

  // useEffect(() => {
  //   if (
  //     dialogContainer.current &&
  //     dialogContainer.current.offsetHeight < dialogContainer.current.scrollHeight
  //   ) {
  //     dialogContainer.current.scrollTop = 3000;
  //   }
  // }, []);

  useEffect(() => {
    if (dialogContainer.current) {
      dialogContainer.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, []);

  const messages = useSelector<RootStateType, MessageOnServerType[]>(
    state => state.messages.messages,
  );

  const interlocutorAvatar = useSelector<RootStateType, Nullable<string>>(state => {
    // reselect
    const interlocutor = state.interlocutors.find(
      person => person.id === Number(interlocutorID),
    );
    return interlocutor ? interlocutor.photos.large : null;
  });

  const currentUserAvatar = useSelector<RootStateType, Nullable<string>>(
    state => state.authData.photo,
  );

  const loggedInUserID = useSelector<RootStateType, Nullable<number>>(
    state => state.authData.id,
  );
  const currentPage = useSelector<RootStateType, number>(
    state => state.messages.currentPage,
  );
  const totalMessagesNumber = useSelector<RootStateType, Nullable<number>>(
    state => state.messages.totalCount,
  );
  // useEffect(() => {
  //   if (
  //     dialogContainer.current &&
  //     dialogContainer.current.offsetHeight < dialogContainer.current.scrollHeight
  //   ) {
  //     dialogContainer.current.scrollTop = 3000;
  //   }
  // }, [messages]);

  useEffect(() => {
    if (dialogContainer.current) {
      dialogContainer.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [messages]);

  const dataPortion = useSelector<RootStateType, number>(
    state => state.messages.portionSize,
  );

  const totalPagesNumber = Math.ceil((totalMessagesNumber || 0) / dataPortion);
  const handleScroll = (): void => {
    if (!dialogContainer.current) return;
    // debugger;
    // console.log(dialogContainer.current);

    console.log('clientHeight', dialogContainer.current.clientHeight);
    console.log('scrollTop', dialogContainer.current.scrollTop);
    console.log('offsetHeight', dialogContainer.current.offsetHeight);

    if (
      dialogContainer.current.scrollTop < 15 &&
      dialogContainer.current.offsetHeight < dialogContainer.current.scrollHeight
    ) {
      debugger;
      if (currentPage < totalPagesNumber) {
        dispatch(getWithUserMessages(interlocutorID, currentPage + 1, 10));
        dialogContainer.current.scrollTop = 100;
      }
    }
    // if (
    //   dialogContainer.current.clientHeight + dialogContainer.current.scrollTop !==
    //   document.documentElement.offsetHeight
    // )
    //   return;
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div
      className={`${styles.dialog} ${hidden ? styles.hidden : ''} ${className}`}
      ref={dialogContainer}
      onScroll={handleScroll}
    >
      {messages.map(({ id, addedAt, body, viewed, senderName, senderId }) => (
        <Message
          key={id}
          userName={senderName}
          isLoggedInUserTheAuthor={senderId === loggedInUserID}
          messageText={body}
          addedAt={addedAt}
          senderAvatar={
            senderId === Number(interlocutorID) ? interlocutorAvatar : currentUserAvatar
          }
        />
      ))}
    </div>
  );
};
