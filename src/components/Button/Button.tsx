import React from 'react';

import classNames from 'clsx';

import styles from './Button.module.scss';

interface ButtonInt {
  actions: { (): void }[];
  children?: React.ReactNode;
  className?: string;
  variant?: 'button' | 'icon';
}

const Button: React.FC<ButtonInt> = ({
  actions,
  children,
  variant = 'button',
  className
}) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        actions.map((action) => {
          return action();
        });
      }}
      className={classNames(className, { [styles.icon]: variant === 'icon' })}
    >
      {children}
    </button>
  );
};

export default Button;
