import styles from '@/components/common/loadingSpinner/styles.module.scss';
import { DotPulse } from '@uiball/loaders';

interface LoadingSpinnerProps {
  size?: number;
  speed?: number;
  color?: string;
}

export const LoadingSpinner = ({
  size = 55,
  speed = 1.3,
  color = '#4cbfa4',
}: LoadingSpinnerProps) => {
  return (
    <div className={styles['loading-spinner-background']}>
      <DotPulse size={size} speed={speed} color={color} />
    </div>
  );
};
