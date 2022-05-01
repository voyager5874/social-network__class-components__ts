import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './Dialog.module.css';

import { MessageOnServerType } from 'api/types';
import { Message } from 'components/dialogs/message/Message';
import { getWithUserMessages } from 'store/middlewares/dialogs';
import { EntityStatus } from 'store/reducers/types';
// import { DispatchType } from 'store/store';
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
  // const dispatch: DispatchType = useDispatch();
  const dispatch = useDispatch();
  const dialogContainer = useRef<HTMLDivElement>(null);
  const scrollAnchor = useRef<HTMLDivElement>(null);
  const [needNewPortion, setNeedNewPortion] = useState(false);

  const dataPortion = useSelector<RootStateType, number>(
    state => state.messages.portionSize,
  );
  const currentPage = useSelector<RootStateType, number>(
    state => state.messages.currentPage,
  );
  const totalMessagesNumber = useSelector<RootStateType, Nullable<number>>(
    state => state.messages.totalCount,
  );

  const currentUserAvatar = useSelector<RootStateType, Nullable<string>>(
    state => state.authData.photo,
  );

  const loggedInUserID = useSelector<RootStateType, Nullable<number>>(
    state => state.authData.id,
  );

  const entityStatus = useSelector<RootStateType, EntityStatus>(
    state => state.messages.entityStatus,
  );

  const interlocutorAvatar = useSelector<RootStateType, Nullable<string>>(state => {
    // reselect
    const interlocutor = state.interlocutors.find(
      person => person.id === Number(interlocutorID),
    );
    return interlocutor ? interlocutor.photos.large : null;
  });

  const messages = useSelector<RootStateType, MessageOnServerType[]>(
    state => state.messages.messages,
  );

  const totalPagesNumber = Math.ceil((totalMessagesNumber || 0) / dataPortion);

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, dataPortion));
    // dispatch(getInterlocutors());
  }, []);

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, dataPortion));
  }, [interlocutorID]);

  useEffect(() => {
    if (!scrollAnchor.current || entityStatus !== EntityStatus.initialization) return;
    scrollAnchor.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [entityStatus]);

  useEffect(() => {
    if (
      !scrollAnchor.current ||
      !dialogContainer.current ||
      entityStatus !== EntityStatus.idle
    )
      return;
    if (
      dialogContainer.current.scrollTop >=
      dialogContainer.current.scrollHeight - dialogContainer.current.offsetHeight
      // I need a condition "when scrolled to bottom" the one above doesn't seem to work
      // messages need to be mapped before scrolling to bottom else dummy div is not at the bottom -> async?
    ) {
      scrollAnchor.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [messages]);

  let dialogContainerScrollPosition = 0;
  const handleScroll = (): void => {
    // event or ref? //es-lint says: "no param reassignment"
    if (!dialogContainer.current) return;
    const { scrollTop, scrollHeight, clientHeight } = dialogContainer.current;
    if (clientHeight >= scrollHeight) return;
    if (entityStatus !== EntityStatus.idle) {
      dialogContainer.current.scrollTop = dialogContainerScrollPosition;
      return;
    }
    dialogContainerScrollPosition = dialogContainer.current.scrollTop;

    if (
      scrollTop < 1 &&
      entityStatus === EntityStatus.idle &&
      currentPage < totalPagesNumber
    ) {
      setNeedNewPortion(true);
    }
    if (needNewPortion && scrollTop > 1) {
      setNeedNewPortion(false);
    }
  };

  useEffect(() => {
    if (!needNewPortion) return;
    dispatch(getWithUserMessages(interlocutorID, currentPage + 1, dataPortion));
  }, [needNewPortion]);

  useEffect(() => {
    if (!dialogContainer.current || entityStatus !== EntityStatus.expansion) return;
    dialogContainer.current.scrollTop = 20;
  }, [entityStatus]);

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
          viewed={viewed}
          senderAvatar={
            senderId === Number(interlocutorID) ? interlocutorAvatar : currentUserAvatar
          }
        />
      ))}
      <div ref={scrollAnchor} />
    </div>
  );
};
