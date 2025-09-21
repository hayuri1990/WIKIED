import { useState, useEffect } from 'react';
import styles from '@/components/boards/bestArticleList/styles.module.scss';
import { getArticles } from '@/services/api/article';
import { Article } from '@/types/article';
import BestBoardCard from '@/components/boards/bestArticleList/bestArticleCard';
import Button from '@/components/common/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';

interface BestArticleListProps {
  setLoading: (loading: boolean) => void;
}

const BestArticleList = ({ setLoading }: BestArticleListProps) => {
  const [bestBoards, setBestBoards] = useState<Article[]>([]);
  const { isLoggedIn } = useAuth();

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getArticles({
        page: 1,
        pageSize: 4,
        orderBy: 'like',
      });
      const response = data.data;
      setBestBoards(response.list);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className={styles['best-board-list']}>
      <div className={styles['best-board-header']}>
        <div className={styles['header']}>베스트 게시글</div>
        {isLoggedIn && (
          <Link href="/addboard">
            <Button className={styles['add-board-button']} color="primary">
              게시물 등록하기
            </Button>
          </Link>
        )}
      </div>
      <div className={styles['board-grid']}>
        {bestBoards.map((board) => (
          <BestBoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BestArticleList;
