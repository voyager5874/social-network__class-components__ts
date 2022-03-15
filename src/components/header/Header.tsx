import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

import { ComponentReturnType, Nullable } from 'types';

type HeaderPropsType = {
  isLoggedIn: boolean;
  login: Nullable<string>;
};

export const Header = ({ isLoggedIn, login }: HeaderPropsType): ComponentReturnType => {
  const someContent = 'header';
  return (
    <div className={styles.header}>
      <div>{someContent}</div>
      <div>
        <div>{login}</div>
        <div>
          {isLoggedIn ? (
            <NavLink to="/login">Logut</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
