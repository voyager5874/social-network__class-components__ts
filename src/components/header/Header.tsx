import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

import logo from 'components/common/assets/logo3.jpg';
import { ComponentReturnType, Nullable } from 'types';

type HeaderPropsType = {
  isLoggedIn: boolean;
  login: Nullable<string>;
  logout: () => void;
};

export const Header = ({
  isLoggedIn,
  login,
  logout,
}: HeaderPropsType): ComponentReturnType => (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <div className={styles.appFlag}>
        <img src={logo} alt="site-logo" className={styles.siteLogo} />
        <h1 className={styles.siteCaption}>IT-INCUBATOR NETWORK</h1>
      </div>

      <div>
        <div>{login}</div>
        <div>
          {isLoggedIn ? (
            <button type="button" onClick={logout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </div>
  </div>
);
