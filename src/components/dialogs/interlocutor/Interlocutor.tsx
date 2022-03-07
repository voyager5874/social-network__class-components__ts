import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Interlocutor.module.css';

import { InterlocutorType } from 'components/dialogs/types';
import { ComponentReturnType } from 'types';

// export const Interlocutor = ({ name }: InterlocutorType): ComponentReturnType => (
//   <div className={styles.interlocutor}>{name}</div>
// );

export const Interlocutor: FC<InterlocutorType> = ({ name, id }): ComponentReturnType => {
  const path = `/dialogs/${id}`;
  return (
    <div className={styles.person}>
      <NavLink
        to={path}
        style={({ isActive }) => ({ color: isActive ? 'black' : 'blue' })}
      >
        {name}
      </NavLink>
    </div>
  );
};
