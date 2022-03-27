import styles from './ErrorTag.module.css';

export const ErrorTag = (props: any) => (
  <div className={styles.errorText}>{props.children}</div>
);
