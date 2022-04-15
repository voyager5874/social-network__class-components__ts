import { AiOutlineCaretDown } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import Popup from 'reactjs-popup';

import styles from './Header.module.css';

import logo from 'components/common/assets/logo3.jpg';
import noAvatar from 'components/common/assets/ninja-coder.jpg';
import { UniversalButton } from 'components/common/universalButton/UniversalButton';
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
}: HeaderPropsType): ComponentReturnType => {
  const addAPIkeyToLocalStorage = (): void => {
    const currentStorageAsString = localStorage.getItem('it-inc-network');
    const currentStorageAsObject =
      currentStorageAsString && JSON.parse(currentStorageAsString);
    const userData = JSON.stringify({
      ...currentStorageAsObject,
      // eslint-disable-next-line no-alert
      customApiKey: prompt('for the app to work properly you need to use your own key'),
    });

    localStorage.setItem('it-inc-network', userData);

    // const currentStorageAsString = localStorage.getItem('it-inc-network');
    // const currentStorageAsObject =
    //     currentStorageAsString && JSON.parse(currentStorageAsString);
    // const userData = JSON.stringify({
    //   ...currentStorageAsObject,
    //   loggedInUserID: response.data.data.id,
    // });
    //
    // localStorage.setItem('it-inc-network', userData);
  };
  return (
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
            {isLoggedIn && (
              <UniversalButton linkStyled onClick={logout}>
                <MdLogout style={{ marginRight: '10px' }} /> Logout
              </UniversalButton>
            )}
            <UniversalButton linkStyled onClick={addAPIkeyToLocalStorage}>
              add your api key
            </UniversalButton>
          </div>
        </Popup>
      </div>
    </div>
  );
};

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
