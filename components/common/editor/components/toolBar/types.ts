import { EditorState } from 'draft-js';

export interface ToolBarProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
  onImageUpload: () => void;
}
