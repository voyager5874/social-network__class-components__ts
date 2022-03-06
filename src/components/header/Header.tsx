import styles from './Header.module.css';

import { ComponentReturnType } from 'types';

export const Header = (): ComponentReturnType => {
  const someContent = 'header';
  return (
    <div>
      <div className={styles.header}>{`${someContent}`}</div>;
    </div>
  );
};
