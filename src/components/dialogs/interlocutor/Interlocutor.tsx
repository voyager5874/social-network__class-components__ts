import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Interlocutor.module.css';

import noAvatar from 'components/common/assets/userWithoutPhoto.png';
import { InterlocutorType } from 'components/dialogs/types';
import { ComponentReturnType } from 'types';
import { formatDateString } from 'utils';

// export const Interlocutor = ({ name }: InterlocutorType): ComponentReturnType => (
//   <div className={styles.interlocutor}>{name}</div>
// );

export const Interlocutor: FC<InterlocutorType & { chosen: boolean }> = ({
  id,
  photos,
  userName,
  hasNewMessages,
  newMessagesCount,
  lastDialogActivityDate,
  lastUserActivityDate,
  chosen = false,
}): ComponentReturnType => {
  const path = `/dialogs/${id}`;
  const formattedDate = formatDateString(lastUserActivityDate);
  return (
    <NavLink
      className={`${styles.interlocutor} ${chosen ? styles.chosen : ''}`}
      to={path}
      style={({ isActive }) => ({ color: isActive ? 'black' : 'darkblue' })}
    >
      <img
        className={styles.avatar}
        src={photos.small || noAvatar}
        alt="interlocutor avatar"
      />
      <div className={styles.interlocutorInfo}>
        <div>{newMessagesCount}</div>
        <div>{userName}</div>
        <div>last seen: {formattedDate.date}</div>
      </div>
    </NavLink>
  );
};
