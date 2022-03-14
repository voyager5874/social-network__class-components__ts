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
        <div>{isLoggedIn ? 'Logout' : 'Login'}</div>
      </div>
    </div>
  );
};
