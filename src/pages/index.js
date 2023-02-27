import Header from '@/components/Header';
import FilterCategory from '@/components/FilterCategory';
import CardsLayout from '@/components/CardsLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  applicationSelector,
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
  // const data = useSelector(applicationSelector);
  const selectedApplications = useSelector(
    state => state.posts.selectedApplications
  );

  const router = useRouter();

  const dispatch = useDispatch();

  const applicationChangeHandler = application => {
    setCurrentFilter(application);
    router.push({
      pathname: router.pathname,
      query: { application: [...selectedApplications, application].join(',') },
    });

    startTransition(() => dispatch(selectApplication([application])));
    setFilter(true);
  };
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
    global.window ? window.document.location.search : undefined
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
