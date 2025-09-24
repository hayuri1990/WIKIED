import { ProfileDetail } from '@/types/wiki';

export interface WikiAsideProps {
  className: string;
  profile: ProfileDetail;
  setProfile: React.Dispatch<React.SetStateAction<ProfileDetail>>;
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
  onProfileChange: (updatedProfile: ProfileDetail) => void;
  onSave: () => void;
  onCancel: () => void;
}
