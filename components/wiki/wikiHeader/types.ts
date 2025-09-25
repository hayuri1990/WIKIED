import { ProfileDetail } from '@/types/wiki';

export interface WikiHeaderProps {
  className?: string;
  profile: ProfileDetail;
  isEditable: boolean;
  onParticipateClick: () => void;
  checkEditStatus: (code: string) => Promise<any>;
  showParticipateBtn: boolean;
  code: string;
}
