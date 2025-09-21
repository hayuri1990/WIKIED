import ArticleList from '@/components/boards/articleList';
import BestArticleList from '@/components/boards/bestArticleList';
import { LoadingSpinner } from '@/components/common/loadingSpinner';
import { useState } from 'react';

const Boards = () => {
  const [loadingBestArticleList, setLoadingBestArticleList] = useState(true);
  const [loadingArticleList, setLoadingArticleList] = useState(true);

  const isLoading = loadingArticleList || loadingBestArticleList;

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <BestArticleList setLoading={setLoadingBestArticleList} />
      <ArticleList setLoading={setLoadingArticleList} />
    </>
  );
};

export default Boards;
