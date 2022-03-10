import styles from './LoadingVisualizer.module.css';

import loadingAnimation from 'components/common/loadingVisualizer/assets/loading.gif';
import { ComponentReturnType } from 'types';

export const LoadingVisualizer = (): ComponentReturnType => (
  <div className={styles.animationContainer}>
    <img src={loadingAnimation} alt="loading animation" width="300px" />
  </div>
);
