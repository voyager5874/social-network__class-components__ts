import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './ToggleButton.module.css';

import { UniversalButton } from 'components/common/universalButton/UniversalButton';
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
  // eslint-disable-next-line react/require-default-props
  linkStyled?: boolean;
};

export const ToggleButton = ({
  changeValueCallback,
  currentToggledValue,
  labelForFalseValue,
  labelForTrueValue,
  children,
  className,
  linkStyled,
  ...respProps
}: ToggleButtonPropsType) => {
  const handleValueChange = () => {
    changeValueCallback(!currentToggledValue);
  };
  const finalClassName = `${styles.default} ${className}`;

  return currentToggledValue ? (
    <UniversalButton
      linkStyled={linkStyled}
      // disabled={buttonDisabled}
      className={finalClassName}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...respProps}
      onClick={handleValueChange}
    >
      {children} <span style={{ width: '10px' }} />
      {labelForTrueValue}
    </UniversalButton>
  ) : (
    <UniversalButton
      linkStyled={linkStyled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...respProps}
      // disabled={buttonDisabled}
      className={finalClassName}
      onClick={handleValueChange}
    >
      {children}
      <span style={{ width: '10px' }} />
      {labelForFalseValue}
    </UniversalButton>
  );
};
