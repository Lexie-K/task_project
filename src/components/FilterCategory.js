import { applicationSelector, dataSelector } from '@/store/postSlice';
import { Box } from '@mui/material';
import styles from '@/styles/Home.module.scss';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useState } from 'react';

const FilterCategory = ({
  applicationChangeHandler,
  applicationResetHandler,
}) => {
  const [filtered, setFiltered] = useState([]);
  const selectedApplications = useSelector(
    state => state.posts.selectedApplications
  );

  const filterItem = application => {
    if (filtered.includes(application)) setFiltered(filtered);
    else setFiltered([...filtered, application]);
  };

  const handleFilter = unik => {
    const newFiltered = [...filtered];
    if (newFiltered.includes(unik)) {
      newFiltered.splice(
        newFiltered.findIndex(application => application === unik),
        1
      );
    } else {
      newFiltered.push(unik);
    }
    setFiltered(newFiltered);
  };

  const data = useSelector(dataSelector);

  const applications = data.map(obj => obj.application);

  const unique = new Set(applications);

  const uniks = [...unique];

  return (
    <div>
      <Box className={styles.mainFilterContainer}>
        <div className={styles.filterContainer}>
          {uniks
            .sort((a, b) => {
              let counterA = 0;
              let counterB = 0;
              data.forEach(item => {
                if (item.application === a) counterA++;
                if (item.application === b) counterB++;
              });
              return counterB - counterA;
            })

            .map(application => {
              const isActive = selectedApplications.includes(application);

              return (
                <button
                  key={application}
                  className={`${styles.uniksBtns} ${
                    isActive ? styles.uniksBtnsFocus : ''
                  }`}
                  onClick={() => {
                    applicationChangeHandler(application, isActive);
                    handleFilter(application);
                  }}
                >
                  {application}
                </button>
              );
            })}
        </div>

        <div className={styles.imageFilter}>
          <Image width="52" height="54" src="/filterpic.png" alt="Filter" />
        </div>
        <button
          className={styles.resetBtn}
          onClick={() => applicationResetHandler()}
        >
          Cбросить все фильтры
        </button>
      </Box>
    </div>
  );
};

export default FilterCategory;
