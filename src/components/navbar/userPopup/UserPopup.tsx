import Popup from 'reactjs-popup';

import styles from './UserPopup.module.css';

const Menu = () => (
  <div className="menu">
    <div className={styles.menuItem}> Menu item 1</div>
    <div className={styles.menuItem}> Menu item 2</div>
    <div className={styles.menuItem}> Menu item 3</div>
    <Popup
      trigger={<div className={styles.menuItem}> Sub menu </div>}
      position="right top"
      on="hover"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: '0px', border: 'none' }}
      arrow={false}
    >
      <div className="menu">
        <div className={styles.menuItem}> item 1</div>
        <div className={styles.menuItem}> item 2</div>
        <div className={styles.menuItem}> item 3</div>
      </div>
    </Popup>
    <div className={styles.menuItem}> Menu item 4</div>
  </div>
);
