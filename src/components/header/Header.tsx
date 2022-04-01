import { AiOutlineCaretDown, AiOutlineLogout } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';

import styles from './Header.module.css';

import logo from 'components/common/assets/logo3.jpg';
import noAvatar from 'components/common/assets/ninja-coder.jpg';
import { LinkStyledButton } from 'components/common/linkButton/linkStyledButton';
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
      <Popup
        trigger={
          <div className={styles.user}>
            <img
              src={photo || noAvatar}
              alt="logged in user avatar"
              className={styles.loggedInUserAvatar}
            />{' '}
            <AiOutlineCaretDown />
          </div>
        }
        closeOnDocumentClick
        position="bottom right"
      >
        <div className={styles.userPopup}>
          <span className={styles.popupItem}>{name}</span>
          {/* <span className={styles.popupItem}>you logged in as {login}</span> */}
          <LinkStyledButton type="button" onClick={logout}>
            <AiOutlineLogout /> Logout
          </LinkStyledButton>
        </div>
      </Popup>
    </div>
  </div>
);

// <div className={styles.header}>
//   <div className={styles.headerContent}>
//     <div className={styles.appFlag}>
//       <img src={logo} alt="site-logo" className={styles.siteLogo} />
//       <h1 className={styles.siteCaption}>IT-INCUBATOR NETWORK</h1>
//     </div>
//
//     <div className={styles.user}>
//       <img
//         src={photo || noAvatar}
//         alt="logged in user avatar"
//         className={styles.headerAvatar}
//       />
//       <div className={styles.headerName}>{name}</div>
//       <div>
//         {isLoggedIn ? (
//           <button type="button" onClick={logout}>
//             Logout
//           </button>
//         ) : (
//           <NavLink to="/login">Login</NavLink>
//         )}
//       </div>
//     </div>
//   </div>
// </div>
