import { applicationSelector } from '@/store/postSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';

const Header = ({ filter }) => {
  const { data } = useSelector(state => state.posts);
  const filteredItems = useSelector(applicationSelector);

  return (
    <div>
      <h1 className={styles.header}>
        Заголовок
        <p className={styles.counter}>
          ({filter ? filteredItems.length : data.length})
        </p>
      </h1>
    </div>
  );
};

export default Header;
