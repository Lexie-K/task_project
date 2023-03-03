import { applicationSelector } from '@/store/postSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '@/styles/Home.module.scss';

const Header = () => {
  const filteredItems = useSelector(applicationSelector);

  return (
    <div>
      <h1 className={styles.header}>
        Заголовок&thinsp;
        <p className={styles.counter}>({filteredItems.length})</p>
      </h1>
    </div>
  );
};

export default Header;
