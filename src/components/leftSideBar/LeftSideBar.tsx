import { useNavigate, NavLink } from 'react-router-dom';

import styles from 'components/leftSideBar/LeftSideBar.module.css';
import { ComponentReturnType } from 'types';

export const LeftSideBar = (): ComponentReturnType => {
  const navigate = useNavigate();
  const handleDialogsLinkClick = (): void => {
    navigate('/dialogs');
  };
  return (
    <div className={styles.leftSideBar}>
      <ul>
        <li>
          <NavLink
            // style={({ isActive }) => ({ color: isActive ? 'yellow' : 'blue' })}
            // className={styles.link}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            to="/messages"
          >
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            to="/news"
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            to="/users"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            to="/friends"
          >
            Friends
          </NavLink>
        </li>
        <li>Music</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};
