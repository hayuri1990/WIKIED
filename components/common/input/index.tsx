import clsx from 'clsx';
import styles from '@/components/common/input/styles.module.scss';
import { InputProps } from '@/components/common/input/types';

const Input = ({
  label,
  errorMessage,
  fullWidth = false,
  className,
  ...props
}: InputProps) => {
  return (
    <div
      className={clsx(styles['input-container'], {
        [styles['full-width']]: fullWidth,
      })}
    >
      {label && <label className={styles['label']}>{label}</label>}
      <input
        className={clsx(
          styles['input'],
          { [styles['error']]: errorMessage },
          className,
        )}
        {...props}
      />
      {errorMessage && (
        <p className={styles['error-message']}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
