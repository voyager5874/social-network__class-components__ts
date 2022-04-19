import { FC, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './Dialog.module.css';

import { MessageOnServerType } from 'api/types';
import { Message } from 'components/dialogs/message/Message';
import { getWithUserMessages } from 'store/middlewares/dialogs';
import { EntityStatus } from 'store/reducers/types';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

export type DialogPropsType = {
  interlocutorID: number;
  className?: string;
  hidden?: boolean;
};
export const Dialog: FC<DialogPropsType> = ({
  interlocutorID,
  className = '',
  hidden = false,
}): ComponentReturnType => {
  const dispatch = useDispatch();
  const dialogContainer = useRef<HTMLDivElement>(null);
  const scrollAnchor = useRef<HTMLDivElement>(null);
  const [scrolledToTop, setScrolledToTop] = useState(false);

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, 10));
  }, []);

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, 10));
  }, [interlocutorID]);

  // useEffect(() => {
  //   // how to scroll down on interlocutor change?
  //   if (!dialogContainer.current) return;
  //   const { clientHeight, scrollHeight } = dialogContainer.current;
  //   if (clientHeight < scrollHeight) {
  //     dialogContainer.current.scrollTop = scrollHeight - clientHeight; // scroll down
  //   }
  // }, [dialogContainer.current && dialogContainer.current.scrollHeight, interlocutorID]);

  // need dummy div and one more ref for this
  // useEffect(() => {
  //   if (dialogContainer.current) {
  //     dialogContainer.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'end',
  //       inline: 'nearest',
  //     });
  //   }
  // }, []);

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

  const entityStatus = useSelector<RootStateType, EntityStatus>(
    state => state.messages.entityStatus,
  );
  // useEffect(() => {
  //   if (!dialogContainer.current) return;
  //   const { clientHeight, scrollHeight, scrollTop } = dialogContainer.current;
  //   debugger;
  //   if (clientHeight < scrollHeight && scrollTop < 10) {
  //     dialogContainer.current.scrollTop =
  //       dialogContainer.current.scrollHeight - dialogContainer.current.clientHeight; // trying to scroll down when already scrolled down
  //   }
  // }, [messages]);

  // useEffect(() => {
  //   if (!scrollAnchor.current) return;
  //   debugger;
  //   scrollAnchor.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //     inline: 'nearest',
  //   });
  // }, [interlocutorID]);

  useEffect(() => {
    if (!scrollAnchor.current || !dialogContainer.current) return;
    debugger;
    if (
      dialogContainer.current.scrollTop >=
      dialogContainer.current.scrollHeight - dialogContainer.current.offsetHeight
    ) {
      scrollAnchor.current.scrollIntoView({
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
    const { scrollTop, scrollHeight, clientHeight } = dialogContainer.current;
    if (clientHeight >= scrollHeight) return;
    //   console.log('clientHeight', dialogContainer.current.clientHeight);
    //   console.log('scrollHeight', dialogContainer.current.scrollHeight);
    //   console.log('scrollTop', dialogContainer.current.scrollTop);
    //   console.log('offsetHeight', dialogContainer.current.offsetHeight);
    if (scrollTop < 1) {
      setScrolledToTop(true);
    }
    if (scrollTop > 1) {
      setScrolledToTop(false);
    }
  };

  useEffect(() => {
    debugger;
    if (currentPage >= totalPagesNumber || !scrolledToTop) return;
    dispatch(getWithUserMessages(interlocutorID, currentPage + 1, dataPortion));
    if (dialogContainer.current) dialogContainer.current.scrollTop = 1; // scroll down a bit to prevent another request firing
  }, [scrolledToTop]);

  return (
    <div
      className={`${styles.dialog} ${hidden ? styles.hidden : ''} ${className}`}
      ref={dialogContainer}
      onScroll={handleScroll}
    >
      {entityStatus === EntityStatus.busy && (
        <div
          style={{
            backgroundColor: 'lightskyblue',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          fetching...
        </div>
      )}
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
      <div ref={scrollAnchor} />
    </div>
  );
};
