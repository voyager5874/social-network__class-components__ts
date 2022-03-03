import { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { v1 } from 'uuid';

import styles from './Dialogs.module.css';

import { interlocutorType, MessagePropsType } from 'components/dialogs/types';
import { dialogsData, messagesData } from 'store/stubData';
import { ComponentReturnType } from 'types';

const Interlocutor: FC<interlocutorType> = ({ name, id }) => {
  const path = `/dialogs/${id}`;
  return (
    <div className={styles.person}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

const Message: FC<MessagePropsType> = ({ messageText }) => {
  const someContent = `___`;

  return (
    <div className={styles.message}>
      {messageText}
      <div>{someContent}</div>
    </div>
  );
};

export const Dialogs = (): ComponentReturnType => (
  <div className={styles.dialogs}>
    <div className={styles.peopleList}>
      <Interlocutor name="Monika" id={v1()} />
      {dialogsData.map(({ name, id }) => (
        <Interlocutor key={id} name={name} id={id} />
      ))}
    </div>

    <div className={styles.messagesContainer}>
      {messagesData.map(({ id, message }) => (
        <Message key={id} messageText={message} />
      ))}
    </div>
  </div>
);
