export interface AddImageProps {
  size?: 'small' | 'large';
  onImageUpload: (file: File) => void;
}
