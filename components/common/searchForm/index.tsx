import { useState } from 'react';
import styles from '@/components/common/searchForm/styles.module.scss';
import Button from '@/components/common/button';
import Image from 'next/image';
import searchIcon from '@/assets/icons/ic_search.svg';
import { SearchFormProps } from '@/components/common/searchForm/types';

const SearchForm = ({ onSearch, text }: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={styles['search-container']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['input-wrapper']}>
          <Image
            src={searchIcon}
            alt="Search"
            width={22}
            height={22}
            className={styles['search-icon']}
          />
          <input
            type="text"
            placeholder={text}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          color="primary"
          size="large"
          className={styles['search-button']}
        >
          검색
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
