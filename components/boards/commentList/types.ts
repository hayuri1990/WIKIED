import { Comment } from '@/types/article';

export interface CommentListProps {
  comments: Comment[];
  onAddComment: (newComment: string) => Promise<void>;
  onDeleteComment: (commentId: number) => Promise<void>;
  onEditComment: (commentId: number, newComment: string) => Promise<void>;
}
