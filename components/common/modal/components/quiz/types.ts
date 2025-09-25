export interface QuizProps {
  size?: 'small' | 'large';
  code: string;
  setIsEditable: (editable: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
  securityQuestion: string;
}
