import React from 'react';

import classNames from 'clsx';

import styles from './Button.module.scss';

interface ButtonInt {
  actions: { (): void }[];
  children?: React.ReactNode;
  title: string;
  disabled?: boolean;
  variant?: 'button' | 'icon' | 'mixed' | 'fancy';
  className?: string;
}

const Button: React.FC<ButtonInt> = ({
  actions,
  children,
  title,
  disabled = false,
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
      disabled={disabled}
      className={classNames(className, {
        [styles.icon]: variant === 'icon',
        [styles.button]: variant === 'button',
        [styles.mixed]: variant === 'mixed',
        [styles.fancy]: variant === 'fancy'
      })}
    >
      {children}
    </button>
  );
};

export default Button;
