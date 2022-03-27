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
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'blue' })}
            className={styles.link}
            // className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`}
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <button
            className={styles.navButton}
            type="button"
            onClick={handleDialogsLinkClick}
          >
            Messages
          </button>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'blue' })}
            // className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`}
            className={styles.link}
            to="/news"
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'blue' })}
            className={styles.link}
            // className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`}
            to="/users"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'blue' })}
            className={styles.link}
            // className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`}
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
