import React from 'react';

import classNames from 'clsx';

import styles from './Button.module.scss';

interface ButtonInt {
  actions: { (): void }[];
  children?: React.ReactNode;
  title: string;
  variant?: 'button' | 'icon';
  className?: string;
}

const Button: React.FC<ButtonInt> = ({
  actions,
  children,
  title,
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
      title={title}
      className={classNames(className, {
        [styles.icon]: variant === 'icon',
        [styles.button]: variant === 'button'
      })}
    >
      {children}
    </button>
  );
};

export default Button;
