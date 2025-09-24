export interface NotificationCardProps {
  timeStamp: string;
  size: 'small' | 'large';
  onDelete: () => void;
}
