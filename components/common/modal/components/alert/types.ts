export interface AlertProps {
  title: string;
  description: string;
  content: string;
  size?: 'small' | 'large';
  onClose?: () => void;
}
