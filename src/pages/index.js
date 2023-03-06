import Header from '@/components/Header';
import FilterCategory from '@/components/FilterCategory';
import CardsLayout from '@/components/CardsLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  removeApplication,
  resetApplication,
  selectApplication,
} from '@/store/postSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import data from '../data/data.json';
import { useTransition } from 'react';
import styles from '@/styles/Home.module.scss';
import Head from 'next/head';

export default function Home({ data }) {
  const [filter, setFilter] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  const selectedApplications = useSelector(
    state => state.posts.selectedApplications
  );

  const router = useRouter();

  const dispatch = useDispatch();

  const applicationChangeHandler = (application, isActive) => {
    if (!isActive) {
      setCurrentFilter(application);

      startTransition(() => dispatch(selectApplication([application])));
      setFilter(true);
    } else {
      dispatch(removeApplication(application));
    }
  };

  useEffect(() => {
    if (selectedApplications.length > 0) {
      router.push({
        pathname: router.pathname,
        query: {
          application: selectedApplications.join(','),
        },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: undefined,
      });
    }
  }, [selectedApplications]);

  const applicationResetHandler = application => {
    startTransition(() => dispatch(resetApplication(application)));
  };

  return (
    <div className={styles.main_container}>
      <Head>
        <title>Task_Project</title>
      </Head>

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

export const getStaticProps = async context => {
  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.document.location.search : undefined
  );

  const applications = params.get('application');
  if (applications) {
    dispatch(selectApplication(applications.split(',')));
  }

  return {
    props: {
      data: data,
    },
  };
};
