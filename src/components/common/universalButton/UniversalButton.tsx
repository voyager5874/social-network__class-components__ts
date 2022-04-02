import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import styles from './UniversalButton.module.css';

import { ComponentReturnType } from 'types';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type UniversalButtonPropsType = DefaultButtonPropsType & {
  // eslint-disable-next-line react/require-default-props
  linkStyled?: boolean;
};

export const UniversalButton: FC<UniversalButtonPropsType> = ({
  type,
  linkStyled,
  className,
  ...respProps
  // eslint-disable-next-line react/button-has-type,react/jsx-props-no-spreading
}): ComponentReturnType => {
  const finalClassName = `${styles.default} ${
    linkStyled ? styles.linkStyled : ''
  } ${className}`;
  // eslint-disable-next-line react/jsx-props-no-spreading,react/button-has-type
  return <button type={type || 'button'} className={finalClassName} {...respProps} />;
};
