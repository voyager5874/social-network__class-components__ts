import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Interlocutor.module.css';

import noAvatar from 'components/common/assets/userWithoutPhoto.png';
import { InterlocutorType } from 'components/dialogs/types';
import { ComponentReturnType } from 'types';

// export const Interlocutor = ({ name }: InterlocutorType): ComponentReturnType => (
//   <div className={styles.interlocutor}>{name}</div>
// );

export const Interlocutor: FC<InterlocutorType> = ({
  id,
  photos,
  userName,
  hasNewMessages,
  newMessagesCount,
  lastDialogActivityDate,
  lastUserActivityDate,
}): ComponentReturnType => {
  const path = `/dialogs/${id}`;
  return (
    <NavLink
      className={styles.interlocutor}
      to={path}
      style={({ isActive }) => ({ color: isActive ? 'black' : 'blue' })}
    >
      <div>{newMessagesCount}</div>
      <div>{userName}</div>
      <img
        className={styles.avatar}
        src={photos.small || noAvatar}
        alt="interlocutor avatar"
      />
    </NavLink>
  );
};
