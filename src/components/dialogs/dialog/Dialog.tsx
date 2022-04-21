import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

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
  const dataPortion = useSelector<RootStateType, number>(
    state => state.messages.portionSize,
  );

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, dataPortion));
  }, []);

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, dataPortion));
  }, [interlocutorID]);

  // useEffect(() => {
  //   // how to scroll down on interlocutor change?
  //   if (!dialogContainer.current) return;
  //   const { clientHeight, scrollHeight } = dialogContainer.current;
  //   if (clientHeight < scrollHeight) {
  //     dialogContainer.current.scrollTop = scrollHeight - clientHeight; // scroll down
  //   }
  // }, [dialogContainer.current && dialogContainer.current.scrollHeight, interlocutorID]);

  useLayoutEffect(() => {
    if (!scrollAnchor.current) return;
    scrollAnchor.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [interlocutorID]);

  useLayoutEffect(() => {
    if (!scrollAnchor.current) return;
    scrollAnchor.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
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

  const entityStatus = useSelector<RootStateType, EntityStatus>(
    state => state.messages.entityStatus,
  );
  useEffect(() => {
    if (!dialogContainer.current || !scrolledToTop) return;
    dialogContainer.current.scrollTop = 10; // to reset local state
  }, [messages, entityStatus]);

  useEffect(() => {
    if (!scrollAnchor.current || !dialogContainer.current) return;
    if (
      dialogContainer.current.scrollTop >=
      dialogContainer.current.scrollHeight - dialogContainer.current.offsetHeight
      // I need a condition "when scrolled to bottom" the one above doesn't seem to work
      // possibly div parameters are not up to date yet when the hook is firing
    ) {
      scrollAnchor.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [entityStatus]);

  const totalPagesNumber = Math.ceil((totalMessagesNumber || 0) / dataPortion);

  let dialogContainerScrollPosition = 0;
  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    // event or ref? //es-lint says: "no param reassignment"
    if (!dialogContainer.current) return;
    const { scrollTop, scrollHeight, clientHeight } = dialogContainer.current;
    if (clientHeight >= scrollHeight) return;
    if (entityStatus === EntityStatus.busy) {
      dialogContainer.current.scrollTop = dialogContainerScrollPosition;
      return;
    }
    dialogContainerScrollPosition = dialogContainer.current.scrollTop;

    if (scrollTop < 1 && entityStatus === EntityStatus.idle) {
      setScrolledToTop(true);
    }
    if (scrolledToTop && scrollTop > 1) {
      setScrolledToTop(false);
    }
  };

  // const handleScroll = (): void => {
  //   if (!dialogContainer.current) return;
  //   const { scrollTop, scrollHeight, clientHeight } = dialogContainer.current;
  //   if (clientHeight >= scrollHeight) return;
  //   //   console.log('clientHeight', dialogContainer.current.clientHeight);
  //   //   console.log('scrollHeight', dialogContainer.current.scrollHeight);
  //   //   console.log('scrollTop', dialogContainer.current.scrollTop);
  //   //   console.log('offsetHeight', dialogContainer.current.offsetHeight);
  //   if (scrollTop < 1) {
  //     setScrolledToTop(true);
  //   }
  //   if (scrolledToTop && scrollTop > 1) {
  //     setScrolledToTop(false);
  //   }
  // };

  useEffect(() => {
    if (
      currentPage >= totalPagesNumber ||
      !scrolledToTop ||
      entityStatus === EntityStatus.busy
    )
      return;
    dispatch(getWithUserMessages(interlocutorID, currentPage + 1, dataPortion));
    // if (dialogContainer.current) dialogContainer.current.scrollTop = 100; // scroll down a bit to prevent another request firing
    // setScrolledToTop(false);
  }, [scrolledToTop]);

  return (
    <div
      className={`${styles.dialog} ${hidden ? styles.hidden : ''} ${className}`}
      ref={dialogContainer}
      // onScroll={entityStatus === EntityStatus.idle ? handleScroll : undefined}
      // onWheel={entityStatus === EntityStatus.idle ? handleScroll : undefined}
      onScroll={handleScroll}
      // style={{ overflowY: `${entityStatus === EntityStatus.busy ? 'hidden' : 'auto'}` }}
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
