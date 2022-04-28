import { BsChatDotsFill, BsPeopleFill } from 'react-icons/bs';
import { IoMdHome } from 'react-icons/io';
import { RiUserSearchFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

export const Navbar = () => (
  <div className={styles.navbar}>
    <NavLink to="/profile" className={styles.navbarItem}>
      <IoMdHome className={styles.navbarIcon} />
      <p>Main</p>
    </NavLink>
    <NavLink to="/users" className={styles.navbarItem}>
      <RiUserSearchFill className={styles.navbarIcon} />
      <p>Users</p>
    </NavLink>
    <NavLink to="/friends" className={styles.navbarItem}>
      <BsPeopleFill className={styles.navbarIcon} />
      <p>Friends</p>
    </NavLink>
    <NavLink to="/dialogs" className={styles.navbarItem}>
      <BsChatDotsFill className={styles.navbarIcon} />
      <p>Messages</p>
    </NavLink>
  </div>
);
