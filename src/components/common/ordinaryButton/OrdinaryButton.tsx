import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import styles from './OrdinaryButton.module.css';

import { ComponentReturnType } from 'types';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type OrdinaryButtonPropsType = DefaultButtonPropsType & {
  // eslint-disable-next-line react/require-default-props
  red?: boolean;
};

// type OrdinaryButtonPropsType = {
//   onClickCallback: () => void;
//   name: string;
// };

export const OrdinaryButton: FC<OrdinaryButtonPropsType> = ({
  red,
  ...respProps
  // eslint-disable-next-line react/button-has-type,react/jsx-props-no-spreading
}): ComponentReturnType => <button className={styles.button} {...respProps} />;
