import { EditorState } from 'draft-js';
import { ProfileDetail } from '@/types/wiki';

export interface ToolBarProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
  onImageUpload: () => void;
  profile: ProfileDetail;
}
