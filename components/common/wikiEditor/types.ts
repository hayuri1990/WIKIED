import { ProfileDetail } from '@/types/wiki';

export interface WikiEditorProps {
  profile: ProfileDetail;
  onEditorChange: (content: string, htmlContent: string) => void;
  initialContent?: string;
}
