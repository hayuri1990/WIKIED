import { ProfileDetail, Section } from '@/types/wiki';

export interface WikiArticleProps {
  className: string;
  profile: ProfileDetail;
  sections: Section[];
  onParticipateClick: () => void;
  checkEditStatus: (code: string) => Promise<any>;
  isEditable: boolean;
  onEditorChange: (content: string, htmlContent: string) => void;
}
