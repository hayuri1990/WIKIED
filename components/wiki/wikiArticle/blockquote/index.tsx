import styles from '@/components/wiki/wikiArticle/blockquote/styles.module.scss';
import { BlockquoteProps } from '@/components/wiki/wikiArticle/blockquote/types';

const Blockquote = ({ children }: BlockquoteProps) => {
  return (
    <div className={styles['blockquote-container']}>
      <div className={styles['prefix']}></div>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};

export default Blockquote;
