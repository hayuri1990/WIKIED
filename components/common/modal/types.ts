export interface ModalProps {
  contents: React.FC<{ size: 'small' | 'large' }>;
  size?: 'small' | 'large';
  onClose?: () => void;
}
