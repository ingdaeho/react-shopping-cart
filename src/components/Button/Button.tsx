import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { contained, outlined } from './Button.css';

interface Props extends ComponentPropsWithoutRef<'button'> {
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary';
}

const Button = ({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  className,
  children,
  onClick,
  ...props
}: PropsWithChildren<Props>) => {
  const buttonClass = classNames(
    {
      [contained({ size, color })]: variant === 'contained',
      [outlined({ size })]: variant === 'outlined',
    },
    className
  );

  return (
    <button type='button' className={buttonClass} {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
