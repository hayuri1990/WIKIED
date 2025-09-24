import { EditorState } from 'draft-js';

export interface ColorPaletteProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
  className?: string;
}
