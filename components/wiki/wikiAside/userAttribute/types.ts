export interface UserAttributeProps {
  attributeName: string;
  value: string;
  name: string;
  isEditable: boolean;
  isCurrentUser?: boolean;
  onChange?: (name: string, value: string) => void;
  className?: string;
}
