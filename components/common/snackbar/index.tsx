import clsx from 'clsx';
import styles from '@/components/common/snackbar/styles.module.scss';
import Image from 'next/image';
import info from '@/assets/icons/ic_info.svg';
import check from '@/assets/icons/check.svg';
import error from '@/assets/icons/error.svg';
import { SnackBarProps } from '@/components/common/snackbar/types';

const SnackBar = ({
  message,
  type = 'info',
  size = 'large',
}: SnackBarProps) => {
  const icon = type === 'success' ? check : type === 'error' ? error : info;

  return (
    <div className={clsx(styles['snackbar'], styles[type], styles[size])}>
      <div className={styles['icon']}>
        <Image src={icon} alt={type} />
      </div>
      <span>{message}</span>
    </div>
  );
};

export default SnackBar;
