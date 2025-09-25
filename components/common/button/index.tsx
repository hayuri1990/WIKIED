import styles from '@/components/common/button/styles.module.scss';
import clsx from 'clsx';
import { ButtonProps } from '@/components/common/button/types';

const Button = ({
  children,
  color = 'primary',
  size = 'large',
  defaultPadding = false,
  fullWidth = false,
  alignEnd = false,
  className,
  trailingIcon,
  ...rest
}: ButtonProps) => {
  const buttonClass = clsx(
    styles.button,
    styles[color],
    styles[size],
    {
      [styles.defaultPadding]: defaultPadding,
      [styles.fullWidth]: fullWidth,
      [styles.alignEnd]: alignEnd,
    },
    className,
  );

  return (
    <button {...rest} className={buttonClass}>
      {children}
      {trailingIcon && <span className={styles['icon']}>{trailingIcon}</span>}
    </button>
  );
};

export default Button;
