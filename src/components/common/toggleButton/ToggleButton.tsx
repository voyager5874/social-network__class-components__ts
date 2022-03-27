import React from 'react';

import styles from 'components/profile/profileCard/ProfileCard.module.css';
import { Nullable } from 'types';

type ToggleButtonPropsType = {
  changeValueCallback: (newValue: boolean) => void;
  currentToggledValue: Nullable<boolean>;
};

export const ToggleButton = ({
  changeValueCallback,
  currentToggledValue,
}: ToggleButtonPropsType) => {
  const handleValueChange = (newValue: boolean) => {
    changeValueCallback(newValue);
  };
  return currentToggledValue ? (
    <button
      // disabled={buttonDisabled}
      className={styles.button}
      type="button"
      onClick={() => handleValueChange(false)}
    >
      unfollow
    </button>
  ) : (
    <button
      // disabled={buttonDisabled}
      className={styles.button}
      type="button"
      onClick={() => handleValueChange(true)}
    >
      follow
    </button>
  );
};
