import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

import logo from 'components/common/assets/logo3.jpg';
import { ComponentReturnType, Nullable } from 'types';

type HeaderPropsType = {
  isLoggedIn: boolean;
  login: Nullable<string>;
  logout: () => void;
  name: Nullable<string>;
  photo: Nullable<string>;
};

export const Header = ({
  isLoggedIn,
  login,
  logout,
  name,
  photo,
}: HeaderPropsType): ComponentReturnType => (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <div className={styles.appFlag}>
        <img src={logo} alt="site-logo" className={styles.siteLogo} />
        <h1 className={styles.siteCaption}>IT-INCUBATOR NETWORK</h1>
      </div>

      <div className={styles.user}>
        <div>{name}</div>
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
