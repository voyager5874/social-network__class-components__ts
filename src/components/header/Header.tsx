import { AiOutlineCaretDown } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import Popup from 'reactjs-popup';

import styles from './Header.module.css';

import logo from 'components/common/assets/logo3.jpg';
import noAvatar from 'components/common/assets/ninja-coder.jpg';
import { UniversalButton } from 'components/common/universalButton/UniversalButton';
import { Navbar } from 'components/navbar/Navbar';
import { ComponentReturnType, Nullable } from 'types';
import { addDataToLocalStorage } from 'utils/localStorageUtils';

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
    // eslint-disable-next-line no-alert
    const userInput = prompt(
      'for the app to work properly right from gh-pages or other hosting provider you need to use your own key and to change domain name in your social-network.samuraijs.com account',
    );
    addDataToLocalStorage('customApiKey', userInput);
  };
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.appFlag}>
          <img src={logo} alt="site-logo" className={styles.siteLogo} />
          <h1 className={styles.siteCaption}>IT-INCUBATOR NETWORK</h1>
        </div>
        <Navbar />
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

// const currentStorageAsString = localStorage.getItem('it-inc-network');
// const currentStorageAsObject =
//   currentStorageAsString && JSON.parse(currentStorageAsString);
// const userData = JSON.stringify({
//   ...currentStorageAsObject,
//   // eslint-disable-next-line no-alert
//   customApiKey: prompt(
//     'for the app to work properly right from gh-pages or other hosting provider you need to use your own key and to change domain name in your social-network.samuraijs.com account',
//   ),
// });
//
// localStorage.setItem('it-inc-network', userData);

// const currentStorageAsString = localStorage.getItem('it-inc-network');
// const currentStorageAsObject =
//     currentStorageAsString && JSON.parse(currentStorageAsString);
// const userData = JSON.stringify({
//   ...currentStorageAsObject,
//   loggedInUserID: response.data.data.id,
// });
//
// localStorage.setItem('it-inc-network', userData);
