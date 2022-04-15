import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './Dialog.module.css';

import { MessageOnServerType } from 'api/types';
import { Message } from 'components/dialogs/message/Message';
import { getWithUserMessages } from 'store/middlewares/dialogs';
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

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, 20));
  }, []);

  useEffect(() => {
    dispatch(getWithUserMessages(interlocutorID, 1, 20));
  }, [interlocutorID]);

  const messages = useSelector<RootStateType, MessageOnServerType[]>(
    state => state.messages.messages,
  );

  const interlocutorAvatar = useSelector<RootStateType, Nullable<string>>(state => {
    // reselect
    const interlocutor = state.interlocutors.find(
      person => person.id === Number(interlocutorID),
    );
    return interlocutor ? interlocutor.photos.small : null;
  });

  const currentUserAvatar = useSelector<RootStateType, Nullable<string>>(
    state => state.authData.photo,
  );

  const loggedInUserID = useSelector<RootStateType, Nullable<number>>(
    state => state.authData.id,
  );

  return (
    <div className={`${styles.dialog} ${hidden ? styles.hidden : ''} ${className}`}>
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
