import styles from './News.module.css';

import { ComponentReturnType } from 'types';

export const News = (): ComponentReturnType => {
  const componentName = 'News';
  return (
    <div className={styles.news}>
      <div>{componentName}</div>
      <div>{componentName}</div>
      <div>{componentName}</div>
      <div>{componentName}</div>
    </div>
  );
};
