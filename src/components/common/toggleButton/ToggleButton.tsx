import React from 'react';

import styles from './ToggleButton.module.css';

import { Nullable } from 'types';

type ToggleButtonPropsType = {
  changeValueCallback: (newValue: boolean) => void;
  currentToggledValue: Nullable<boolean>;
  labelForTrueValue: string;
  labelForFalseValue: string;
};

export const ToggleButton = ({
  changeValueCallback,
  currentToggledValue,
  labelForFalseValue,
  labelForTrueValue,
}: ToggleButtonPropsType) => {
  const handleValueChange = () => {
    changeValueCallback(!currentToggledValue);
  };
  return currentToggledValue ? (
    <button
      // disabled={buttonDisabled}
      className={styles.button}
      type="button"
      onClick={handleValueChange}
    >
      {labelForTrueValue}
    </button>
  ) : (
    <button
      // disabled={buttonDisabled}
      className={styles.button}
      type="button"
      onClick={handleValueChange}
    >
      {labelForFalseValue}
    </button>
  );
};
