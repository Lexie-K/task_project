import Header from '@/components/Header';
import FilterCategory from '@/components/FilterCategory';
import CardsLayout from '@/components/CardsLayout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { resetApplication, selectApplication } from '@/store/postSlice';

import { useDispatch } from 'react-redux';
import data from '../data/data.json';
import { useTransition } from 'react';
import styles from '../styles/Home.module.scss';

export default function Home({data}) {
  const [filter, setFilter] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const router = useRouter();
  
  const dispatch = useDispatch();
  
  const applicationChangeHandler = (application) => {
    setCurrentFilter(application);
    const id = router.query;
    router.push( 
      {
        pathname: router.pathname, 
        query: {id},
      },)

    startTransition(() => dispatch(selectApplication(application)));
    setFilter(true);
  };
  const applicationResetHandler = application => {
    startTransition(() => dispatch(resetApplication(application)));
  };

  return (
    <div className={styles.main_container}>
      <Header filter={filter} />
      <FilterCategory
        currentFilter={currentFilter}
        applicationChangeHandler={applicationChangeHandler}
        applicationResetHandler={applicationResetHandler}
      />

      <CardsLayout filter={filter} />
    </div>
  );
}

export async function getServerSideProps() {
  return { props: data };
}
