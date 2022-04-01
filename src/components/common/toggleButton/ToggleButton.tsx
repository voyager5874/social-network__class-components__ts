import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './ToggleButton.module.css';

import { LinkStyledButton } from 'components/common/linkButton/linkStyledButton';
import { Nullable } from 'types';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ToggleButtonPropsType = DefaultButtonPropsType & {
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
  children,
  ...respProps
}: ToggleButtonPropsType) => {
  const handleValueChange = () => {
    changeValueCallback(!currentToggledValue);
  };
  return currentToggledValue ? (
    <LinkStyledButton
      // disabled={buttonDisabled}
      // className={styles.button}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...respProps}
      type="button"
      onClick={handleValueChange}
    >
      {children} <span style={{ width: '10px' }} />
      {labelForTrueValue}
    </LinkStyledButton>
  ) : (
    <LinkStyledButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...respProps}
      // disabled={buttonDisabled}
      // className={styles.button}
      type="button"
      onClick={handleValueChange}
    >
      {children}
      <span style={{ width: '10px' }} />
      {labelForFalseValue}
    </LinkStyledButton>
  );
};
