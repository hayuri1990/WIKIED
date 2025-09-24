export interface EditNotificationProps {
  size?: 'small' | 'large';
  onClose?: () => void;
}

export interface Notification {
  id: number;
  timeStamp: string;
}
